"use server";
import { cache } from "react";
import { getUserNameFromSession } from "@/lib/sessions";
import {
  createDb,
  // deleteDB,
  getDbOfUser,
  getDbsOfuser,
  getReplicasetInfo,
} from "../lib/databases";

import { redirect } from "next/navigation";

export const getDatabasesCache = cache(async () => {
  const username = await getUserNameFromSession();
  return await getDbsOfuser(username);
});

export const getDatabaseCache = cache(async (dbName: string) => {
  const username = await getUserNameFromSession();
  const db = await getDbOfUser(username, dbName);

  return { username, db };
});

export const createDbAction = async (state: any, formData: FormData) => {
  const dbName = formData.get("database")?.toString();

  if (!dbName) return { error: "Name not provided" };

  const username = (await getUserNameFromSession()) as string;

  let fullDbName: string;

  try {
    fullDbName = await createDb(dbName, username);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }

  // TODO: might need to remove if using React Hook Form's onSubmit
  redirect(`/databases/${fullDbName}`);
};

export const getReplicasetInfoCache = async () => {
  // UNUSED
  return await getReplicasetInfo();
};
