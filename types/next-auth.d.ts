import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN" | "DRIVER";
      status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
       onboardingCompleted?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "USER" | "ADMIN" | "DRIVER";
    status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    onboardingCompleted?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "USER" | "ADMIN" | "DRIVER";
    status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
     onboardingCompleted?: boolean; 
  }
}