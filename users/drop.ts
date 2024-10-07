import { client } from "../client"

async function main() {
  await client.connect()
  const db = client.db("admin")

  await db.command({
    dropUser: "test",
  })

  await client.close()
}

main()
