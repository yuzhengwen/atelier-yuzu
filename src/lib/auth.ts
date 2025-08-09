import { betterAuth } from "better-auth";
import { db } from "./db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

console.log("ENV:", {
  origin: process.env.VERCEL_URL,
  DEBUG_TEXT: process.env.DEBUG_TEXT,
  NODE_ENV: process.env.NODE_ENV
});
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
