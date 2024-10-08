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

// export const getUserNameById = async (userId: number) => {
//   // TODO
// }

export const getDbsOfuser = async (username: string) => {
  const db = client.db("admin")

  const {
    users: [user],
  } = await db.command({
    usersInfo: username,
  })

  return user.roles.map(({ db }: any) => db)
}

// export async function checkIfDbExists(database: string) {
//   const query = `SELECT 1 FROM pg_catalog.pg_database WHERE pg_catalog.pg_database.datname = $1`
//   const { rows } = await pool.query(query, [database])
//   return !!rows.length
// }

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
      role: "dbAdmin",
      db: fullDbName,
    },
  ]

  await db.command({
    grantRolesToUser: ownerName,
    roles,
  })

  return fullDbName
}

// export const deleteDB = async (name: string) => {
//   const query = format(`DROP DATABASE %I`, name)

//   await pool.query(query)
// }
