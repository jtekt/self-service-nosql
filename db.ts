import { MongoClient } from "mongodb";
import { mongoDbConectionString, redactedConnectionString } from "@/config";

export const client = new MongoClient(mongoDbConectionString, {});

console.log(`[MongoDB] connection to ${redactedConnectionString}`);
client
  .connect()
  .then(() => {
    console.log(`[MongoDB] client connected`);
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
