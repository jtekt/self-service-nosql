import { client } from "../client"

async function main() {
  await client.connect()
  const db = client.db("admin")

  const {
    users: [user],
  } = await db.command({
    usersInfo: "test",
  })

  console.log(user)

  await client.close()
}

main()
