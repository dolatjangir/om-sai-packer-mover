import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
       name?: string | null;
        image?: string | null;
      role: "USER" | "ADMIN" | "DRIVER" | null;
      status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
       onboardingCompleted?: boolean;
    } ;
  }

  interface User {
    role?: "USER" | "ADMIN" | "DRIVER" | null;
    status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
    onboardingCompleted?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "USER" | "ADMIN" | "DRIVER"| null;
    status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
     onboardingCompleted?: boolean; 
  }
}