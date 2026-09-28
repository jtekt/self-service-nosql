import { client } from "@/db"

export const getUserIdByName = async (username: string) => {
  const db = client.db("admin")

  const {
    users: [user],
  } = await db.command({
    usersInfo: username,
  })

  return user.userId.toString()
}

export const getDbsOfuser = async (username: string) => {
  const db = client.db("admin")

  const {
    users: [user],
  } = await db.command({
    usersInfo: username,
  })

  return user.roles.map(({ db }: any) => db)
}

export const getDbOfUser = async (username: string, dbName: string) => {
  const db = client.db("admin")

  const {
    users: [user],
  } = await db.command({
    usersInfo: username,
  })

  const foundDb = user.roles.find(({ db }: any) => db === dbName)

  return foundDb.db
}

export const createDb = async (database: string, ownerName: string) => {
  const db = client.db("admin")

  // const dbName = `${username}-mydb`
  // PROBLEM: should prevent users from accessing others' DB
  // For instance, user john-doe would create john-doe-db
  // user john could create john-doe-db too

  // IDEA 1: use a delimiter that users cannot use in their DB name
  // NOTE: "/", ".", "$" are not allowed
  // const dbName = `${username}/mydb`

  // IDEA 2: use a hash
  // Problem: cannot know original username anymore
  // const hashedUsername = createHash("shake256", { outputLength: 6 })
  //   .update(username)
  //   .digest("hex")
  // const dbName = `${hashedUsername}-mydb`

  // IDEA 3: can use the username from MongoDB
  const {
    users: [user],
  } = await db.command({
    usersInfo: ownerName,
  })
  const userId = user.userId.toString()
  const fullDbName = `${userId}-${database}`

  const roles = [
    {
      role: "dbOwner",
      db: fullDbName,
    },
  ]

  await db.command({
    grantRolesToUser: ownerName,
    roles,
  })

  return fullDbName
}

export const deleteDb = async (database: string, ownerName: string) => {
  const db = client.db("admin")

  const {
    users: [user],
  } = await db.command({
    usersInfo: ownerName,
  })
  if (!user) throw new Error(`User ${ownerName} not found`)

  // Only databases created by this app for this user: named after their
  // MongoDB user ID (see createDb) and owned by them
  const userId = user.userId.toString()
  const isOwner =
    database.startsWith(`${userId}-`) &&
    user.roles.some(
      ({ role, db }: any) => role === "dbOwner" && db === database
    )
  if (!isOwner)
    throw new Error(`${database} is not a database of user ${ownerName}`)

  // Drop before revoking, so a failure never leaves a database without owner
  await client.db(database).dropDatabase()

  await db.command({
    revokeRolesFromUser: ownerName,
    roles: [{ role: "dbOwner", db: database }],
  })
}

export const getReplicasetInfo = async () => {
  // UNUSED
  const db = client.db("admin")

  const result = await db.command({
    hello: 1,
  })

  console.log(result)
  return result
}
