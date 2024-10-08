// i.e. create DB

import { client } from "../client"

async function main() {
  await client.connect()
  const db = client.db("admin")

  const username = "test"
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
