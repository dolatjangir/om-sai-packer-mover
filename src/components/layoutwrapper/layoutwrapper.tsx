"use client";

import { usePathname } from "next/navigation";
import PackersMoversFooter from "../footer";
import Navbar from "../navbar";






export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideRoutes = ["/login","/register",
    "/seodashboard","/seo",
    "/onboarding",
    "/seo-login",
   
"/onboarding/role",
  
  "/blogs","/blogs/new","/blog/[slug]","/user","/admin","/driver"];
  const hideLayout = hideRoutes.includes(pathname) ||
 ["/admin-dashboard/", "/user/", "/admin/", "/driver/"].some((route) =>
    pathname.startsWith(route)
);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      
     
      {!hideLayout &&  <PackersMoversFooter/> }
    </>
  );
}