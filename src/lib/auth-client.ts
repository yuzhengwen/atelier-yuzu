import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000",
});

export const signInGithub = async () => {
  await authClient.signIn.social({
    provider: "github",
  });
};

export const signOut = async () => {
  try {
    const result = await authClient.signOut();
    return result;
  } catch (error) {
    console.error("Sign out error in auth-client:", error);
    throw error; // Re-throw to handle in component
  }
};
