// i.e. create DB

import { client } from "../client"

async function main() {
  await client.connect()
  const db = client.db("admin")

  const username = "test"
  // Does this really prevent users from accessing others' DBs?
  // For instance, user john-doe would create john-doe-db
  // user john could create john-doe-db too
  const dbName = `${username}-mydb`
  const roles = [
    {
      role: "readWrite",
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
