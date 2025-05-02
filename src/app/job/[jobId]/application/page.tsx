'use client'
import Nav from "@/components/nav/nav";
import { SessionProvider } from "next-auth/react";
import JobApplicationForm from "./form";

export default function JobApplication() {

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Nav />
      <main id="application-form" className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div id="job-header" className="rounded-xl mb-8">
              <div className="flex items-start gap-6">
                <button className="text-purple-500 hover:text-gray-300">
                  <i className="fa-solid fa-arrow-left mr-2"></i>
                </button>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">Senior Software Engineer</h1>
                  <div className="flex items-center text-gray-400 mb-4">
                    <span className="flex items-center mr-4">
                      <i className="fa-solid fa-building mr-2"></i>
                      Google
                    </span>
                    <span className="flex items-center mr-4">
                      <i className="fa-solid fa-location-dot mr-2"></i>
                      Remote
                    </span>
                    <span className="flex items-center">
                      <i className="fa-solid fa-clock mr-2"></i>
                      Full-time
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">$120k-$180k</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Posted 2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
            <SessionProvider>
              <JobApplicationForm />
            </SessionProvider>
          </div>
        </div>
      </main>
    </div>
  );
}
