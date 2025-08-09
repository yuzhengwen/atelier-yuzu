import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    console.log("Dashboard Page: No session found, redirecting to home");
    redirect("/");
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
    </div>
  );
}
