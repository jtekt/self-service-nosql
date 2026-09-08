import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { SESSION_SECRET, SESSION_COOKIE_NAME } from "@/config";

const encodedKey = new TextEncoder().encode(SESSION_SECRET);

type SessionPayload = {
  username: string;
  expiresAt: Date;
};

async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const jwt = await encrypt({ username, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, jwt);
}

export async function getUserNameFromSession(): Promise<string> {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(cookie);
  return session?.username as string;
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}
