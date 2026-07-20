import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
 
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production", // false on localhost
      },
    },
  },
  
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          status: user.status,
          onboardingCompleted: user.onboardingCompleted,
        };
      },
    }),
  ],
  
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
            select: { role: true, status: true, onboardingCompleted: true }
        });
        if (existingUser) {
          user.role = existingUser.role;
          user.status = existingUser.status;
           user.onboardingCompleted = existingUser.onboardingCompleted;
        } else {
          user.role = null;
          user.status = "ACTIVE";
           user.onboardingCompleted = false;
        }
      }
      return true;
    },
async jwt({ token, user, account, trigger }) {
  // CASE 1: Initial sign-in (OAuth or Credentials)
  if (user) {
    // For Google OAuth, fetch fresh DB data because PrismaAdapter created the user
    if (account?.provider === "google") {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email! }, // <-- use user.email, not token.email
        select: { id: true, role: true, status: true, onboardingCompleted: true, image: true },
      });
      if (dbUser) {
        token.id = dbUser.id;
        token.email = user.email!;
        token.role = dbUser.role; // null for new Google users
        token.status = dbUser.status;
        token.onboardingCompleted = dbUser.onboardingCompleted; // false
        token.picture = dbUser.image ?? user.image;
      }
    } else {
      // Credentials login
      token.id = user.id as string;
      token.email = user.email as string;
      token.role = (user as any).role;
      token.status = (user as any).status;
      token.onboardingCompleted = (user as any).onboardingCompleted ?? true;
       token.picture = (user as any).image;
    }
  }

  // CASE 2: Subsequent requests and session refreshes
  if (!user && token.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: token.email },
      select: { id: true, role: true, status: true, onboardingCompleted: true, image: true },
    });
    if (dbUser) {
      token.id = dbUser.id;
      token.role = dbUser.role;
      token.status = dbUser.status;
      token.onboardingCompleted = dbUser.onboardingCompleted;
      token.picture = dbUser.image;
    }
  }

  // CASE 3: Subsequent requests (token already has data) — ensure defaults
  if (token.onboardingCompleted === undefined) {
    token.onboardingCompleted = false;
  }

  return token;
},
  async session({ session, token }) {
  if (token) {
    session.user.id = token.id as string;
    session.user.role = token.role as "USER" | "ADMIN" | "DRIVER" | null;
    session.user.status = token.status as "ACTIVE" | "INACTIVE" | "SUSPENDED";
    // CRITICAL: Convert undefined/null to false
    session.user.onboardingCompleted = token.onboardingCompleted === true;
     session.user.image = token.picture as string | null; 
  }  
  return session;
},

  },
  events: {
    async signIn({ user, account }) {
      console.log(`User ${user.email} signed in via ${account?.provider || "credentials"}`);
    },
  },
});