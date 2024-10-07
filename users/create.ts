import { client } from "../client"

async function main() {
  await client.connect()
  const db = client.db("admin")

  await db.command({
    createUser: "test",
    pwd: "poketenashi",
    // roles are empty at first, will be filled with users create databases using grantRolesToUser()
    roles: [],
  })

  await client.close()
}

main()
