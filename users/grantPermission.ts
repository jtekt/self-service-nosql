// i.e. create DB

import { client } from "../client"
import { hash, createHash } from "crypto"
async function main() {
  await client.connect()
  const db = client.db("admin")

  const username = "test"

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
    usersInfo: username,
  })
  const userId = user.userId.toString()
  const dbName = `${userId}-mydb`

  const roles = [
    {
      role: "dbAdmin",
      db: dbName,
    },
  ]

  await db.command({
    grantRolesToUser: username,
    roles,
  })

  await client.close()
}

main()
