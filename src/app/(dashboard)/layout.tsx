import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClientLayout from "./DashboardClientLayout";

  export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    // Read cookies from the request and forward them to the session API
    const cookieHeader = cookies().toString();

    const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const sessionRes = await fetch(new URL("/api/auth/session", base).toString(), {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });

    if (!sessionRes.ok) {
      return redirect("/login");
    }

    const session = await sessionRes.json();

    if (!session?.user?.id) {
      return redirect("/login");
    }

    return <DashboardClientLayout session={session}>{children}</DashboardClientLayout>;
  }
          