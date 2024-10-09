import { MongoClient } from "mongodb"
import { mongoDbConectionString } from "@/config"

export const client = new MongoClient(mongoDbConectionString, {})

client
  .connect()
  .then(() => {
    console.log(`MongoDB client connected`)
  })
  .catch((error) => {
    console.error(error)
  })
