import { MongoClient } from "mongodb";
import { client } from "@/db";
import { mongoDbConectionString } from "@/config";
import z from "zod";

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
  // Same rules as the register form, which can be bypassed by calling the action directly
  const schema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." })
      .regex(/^[a-z0-9_]*$/, {
        message: "Lowercase letters, numbers and underscores only",
      }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const parsed = schema.safeParse({ username, password });
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const db = client.db("admin");
  await db.command({
    createUser: username,
    pwd: password,
    // roles are empty at first, will be filled with users create databases using grantRolesToUser()
    roles: [],
  });
}
