import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  const userStatus = req.auth?.user?.status;
  const onboardingCompleted = req.auth?.user?.onboardingCompleted ?? true;

  // 1. Allow all NextAuth API routes (signin, callback, session, etc.)
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 2. Define route flags (ONLY inside the handler — nextUrl exists here)
  const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname);
  const isOnboardingRoute = nextUrl.pathname === "/onboarding/role";
  const isProtectedRoute =
    nextUrl.pathname.startsWith("/user") ||
    nextUrl.pathname.startsWith("/admin") ||
    nextUrl.pathname.startsWith("/driver");

  // 3. ONBOARDING ROUTE: handle access rules
  if (isOnboardingRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    // Already onboarded? Send to their dashboard
    if (onboardingCompleted && userRole) {
      const redirectUrl =
        userRole === "ADMIN" ? "/admin" : userRole === "DRIVER" ? "/driver" : "/user";
      return NextResponse.redirect(new URL(redirectUrl, nextUrl));
    }
    return NextResponse.next(); // Allow access to onboarding
  }

  // 4. NOT LOGGED IN + trying to access protected area → login
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 5. LOGGED IN but hasn't completed onboarding → FORCE to onboarding
  // This catches EVERY route (including /login, /register, /, etc.)
  if (isLoggedIn && (!onboardingCompleted || !userRole)) {
    return NextResponse.redirect(new URL("/onboarding/role", nextUrl));
  }

  // 6. LOGGED IN + hits login or register → redirect to their dashboard
  if (isLoggedIn && isAuthRoute) {
    const redirectUrl =
      userRole === "ADMIN" ? "/admin" : userRole === "DRIVER" ? "/driver" : "/user";
    return NextResponse.redirect(new URL(redirectUrl, nextUrl));
  }

  // 7. SUSPENDED users
  if (isLoggedIn && userStatus === "SUSPENDED") {
    return NextResponse.redirect(new URL("/login?error=AccountSuspended", nextUrl));
  }

  // 8. ROLE-BASED ACCESS CONTROL
  // Admin routes: only ADMIN
  if (nextUrl.pathname.startsWith("/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/user", nextUrl));
  }

  // Driver routes: DRIVER or ADMIN
  if (
    nextUrl.pathname.startsWith("/driver") &&
    userRole !== "DRIVER" &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/user", nextUrl));
  }

  // /user root: redirect ADMIN and DRIVER to their own dashboards
  if (nextUrl.pathname === "/user") {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
    if (userRole === "DRIVER") {
      return NextResponse.redirect(new URL("/driver", nextUrl));
    }
  }

  // 9. Everything else (/, /forgot-password, public pages) → allow
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};