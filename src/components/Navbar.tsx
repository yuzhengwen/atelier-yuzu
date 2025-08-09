import React from "react";
import NavbarClient from "./NavbarClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Upload", href: "/upload" },
  ];
  console.log(
    session ? `Session found: ${session.user.name}` : "No session found"
  );

  return <NavbarClient navItems={navItems} user={session?.user} />;
}
