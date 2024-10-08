import { MongoClient } from "mongodb"
import {
  MONGODB_ADMIN_USERNAME,
  MONGODB_ADMIN_PASSWORD,
  mongoDbConectionString,
} from "@/config"

export const client = new MongoClient(mongoDbConectionString, {
  auth: {
    username: MONGODB_ADMIN_USERNAME,
    password: MONGODB_ADMIN_PASSWORD,
  },
})

client
  .connect()
  .then(() => {
    console.log(`MongoDB client connected`)
  })
  .catch((error) => {
    console.error(error)
  })
