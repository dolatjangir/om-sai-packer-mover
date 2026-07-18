// (dashboard)/layout.tsx
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClientLayout from "./DashboardClientLayout";

export default async function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const cookieStore = await cookies();
  
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  
  const sessionRes = await fetch(
    new URL("/api/auth/session", base).toString(), 
    {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    }
  );

  if (!sessionRes.ok) {
    return redirect("/login");
  }

  const session = await sessionRes.json();

  if (!session?.user?.id) {
    return redirect("/login");
  }

  const userRole = session?.user?.role;
  const onboardingCompleted = session?.user?.onboardingCompleted;

  // ✅ Only redirect to onboarding if:
  // 1. User has NO role (null, undefined, or empty string)
  // 2. AND onboarding is NOT completed
  // This handles Google OAuth users who need to pick a role
  const needsOnboarding = 
    (!userRole || userRole === "") && 
    onboardingCompleted !== true;

  if (needsOnboarding) {
    return redirect("/onboarding/role");
  }

  // ✅ All other users (regular register with role, or Google OAuth after onboarding) 
  // go to their respective dashboards
  return (
    <DashboardClientLayout session={session}>
      {children}
    </DashboardClientLayout>
  );
}