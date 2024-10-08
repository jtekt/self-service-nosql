import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const { MONGODB_CONNECTION_STRING = "mongodb://localhost:27017" } = process.env

async function main() {
  const username = "test"
  const password = "poketenashi"

  const client = new MongoClient(MONGODB_CONNECTION_STRING, {
    auth: {
      username,
      password,
    },
  })

  await client.connect()
  await client.close()

  // TODO: create a JWT
}

main()
