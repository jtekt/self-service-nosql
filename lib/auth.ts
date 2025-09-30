import { MongoClient } from "mongodb";
import { client } from "@/db";
import { mongoDbConectionString } from "@/config";

export async function login(username: string, password: string) {
  const tempClient = new MongoClient(mongoDbConectionString, {
    auth: {
      username,
      password,
    },
  });

  await tempClient.connect();
  await tempClient.close();
}

export async function register(username: string, password: string) {
  if (!username) throw "Missing username";

  const db = client.db("admin");
  await db.command({
    createUser: username,
    pwd: password,
    // roles are empty at first, will be filled with users create databases using grantRolesToUser()
    roles: [],
  });
}
