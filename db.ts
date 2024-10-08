import { MongoClient } from "mongodb"

export const {
  MONGODB_CONNECTION_STRING = "mongodb://localhost:27017",
  MONGODB_ADMIN_USERNAME,
  MONGODB_ADMIN_PASSWORD,
} = process.env

export const client = new MongoClient(MONGODB_CONNECTION_STRING, {
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
