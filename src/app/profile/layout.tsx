import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Nav from "@/components/nav/nav";

export const metadata: Metadata = {
  title: "SwiftSelect",
  description: "Profile",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      	<Nav />
        <Toaster/>
        {children}
    </>   

  );
}