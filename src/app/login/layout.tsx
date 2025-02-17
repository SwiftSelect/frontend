import type { Metadata } from "next";
import "../globals.css";
import Script from "next/script";
import { inter } from "../fonts/inter";

export const metadata: Metadata = {
  title: "SwiftSelect",
  description: "Login/Signup",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js" strategy="afterInteractive" />
          
      </head>
      <body >
        {children}
      </body>
    </html>
  );
}
