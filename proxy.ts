import { NextResponse } from "next/server";
import { auth } from "./auth";


const publicRoutes = ["/", "/login", "/register", "/forgot-password", "/reset-password"];
const authRoutes = ["/login", "/register"];
const userRoutes = ["/user", "/user/"];
const adminRoutes = ["/admin", "/admin/"];
const driverRoutes = ["/driver", "/driver/"];
const apiAuthPrefix = "/api/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  const userStatus = req.auth?.user?.status;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some((route) => 
    nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/")
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isUserRoute = userRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isDriverRoute = driverRoutes.some((route) => nextUrl.pathname.startsWith(route));

  if (isApiAuthRoute) return NextResponse.next();

  if (isPublicRoute && !isUserRoute && !isAdminRoute && !isDriverRoute) {
    if (isAuthRoute && isLoggedIn) {
      const redirectUrl = userRole === "ADMIN" ? "/admin" : userRole === "DRIVER" ? "/driver" : "/user";
      return NextResponse.redirect(new URL(redirectUrl, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && (isUserRoute || isAdminRoute || isDriverRoute)) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn && userStatus === "SUSPENDED") {
    return NextResponse.redirect(new URL("/login?error=AccountSuspended", nextUrl));
  }

  if (isAdminRoute && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/user", nextUrl));
  }

  if (isDriverRoute && userRole !== "DRIVER" && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/user", nextUrl));
  }

  if (isUserRoute && userRole === "ADMIN" && nextUrl.pathname === "/user") {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};