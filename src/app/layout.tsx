import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { inter } from "./fonts/inter";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "SwiftSelect",
  description: "An AI powered Recruitment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
      <Script id="font-awesome-config" strategy="beforeInteractive">
        {`
          window.FontAwesomeConfig = {
            autoReplaceSvg: 'nest',
          }
        `}
      </Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js" strategy="afterInteractive" />
      </head>
      <body>
      <Toaster/>
        {children}
      </body>
    </html>
  );
}
