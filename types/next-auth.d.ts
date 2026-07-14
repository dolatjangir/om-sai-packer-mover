import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN" | "DRIVER";
      status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "USER" | "ADMIN" | "DRIVER";
    status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "USER" | "ADMIN" | "DRIVER";
    status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  }
}