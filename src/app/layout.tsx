import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import LayoutWrapper from "@/components/layoutwrapper/layoutwrapper";

export const metadata: Metadata = {
  title: "OmSaiPackersAndMovers",
  description: "packing and moving with easy steps",
  
  // Favicon & Apple Touch Icon
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: ["/favicon.ico"],
  },
  
  // PWA manifest
  manifest: "/manifest.json",
  
  // Apple-specific
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OmSaiPackersAndMovers",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
     <LayoutWrapper>
        {children}
</LayoutWrapper>
</SessionProvider>
      </body>
    </html>
  );
}