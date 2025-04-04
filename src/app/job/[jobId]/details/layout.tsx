import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import Nav from "@/components/nav/nav";

export const metadata: Metadata = {
  title: "SwiftSelect",
  description: "Job Details",
};

export default function JobDetails({
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