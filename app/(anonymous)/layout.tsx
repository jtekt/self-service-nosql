import { redirect } from "next/navigation";

import { getUserNameFromSession } from "@/lib/sessions";

export default async function AnonymousLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = await getUserNameFromSession();
  if (username) redirect("/");
  return children;
}
