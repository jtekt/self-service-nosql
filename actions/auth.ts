"use server";

import { redirect } from "next/navigation";
import { login, register } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/sessions";

type Credentials = {
  username: string;
  password: string;
};

export async function loginAction(state: any, credentials: Credentials) {
  const { username, password } = credentials;

  try {
    await login(username, password);
    await createSession(username);
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }

  redirect("/databases");
}

export async function createUserAction(state: any, credentials: Credentials) {
  const { username, password } = credentials;

  try {
    await register(username, password);

    await createSession(username);
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }

  redirect("/databases");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
