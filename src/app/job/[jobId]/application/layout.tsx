import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import Nav from "@/components/nav/nav";

export const metadata: Metadata = {
  title: "SwiftSelect",
  description: "Job Application",
};

export default function JobApplication({
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