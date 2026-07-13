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
   
"/admin-dashboard",
  
  "/blogs","/blogs/new","/blog/[slug]"];
  const hideLayout = hideRoutes.includes(pathname) ||
  pathname.startsWith("/admin-dashboard/");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      
     
      {!hideLayout &&  <PackersMoversFooter/> }
    </>
  );
}