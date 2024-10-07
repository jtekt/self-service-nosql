import dotenv from "dotenv"
import { MongoClient } from "mongodb"
dotenv.config()

const {
  MONGODB_CONNECTION_STRING = "mongodb://localhost:27017",
  MONGODB_ADMIN_USERNAME,
  MONGODB_ADMIN_PASSWORD,
} = process.env

export const client = new MongoClient(MONGODB_CONNECTION_STRING, {
  // auth: {
  //   username: MONGODB_ADMIN_USERNAME,
  //   password: MONGODB_ADMIN_PASSWORD,
  // },
})
