'use client'
import Nav from "@/components/nav/nav";
import { SessionProvider } from "next-auth/react";
import JobApplicationForm from "./form";
import useApplication from "./useApplication";
import { BackButton } from "@/components/buttons";
import { useRouter } from "next/navigation";    

function JobApplicationDetails() {
  const { job, formik, handleResumeUpload } = useApplication();
  const router = useRouter();

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Nav />
      <main id="application-form" className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div id="job-header" className="rounded-xl mb-8">
              <div className="flex items-start gap-6">
              <BackButton onClick={() => router.back()} />  
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{job?.title}</h1>
                  <div className="flex items-center text-gray-400 mb-4">
                    <span className="flex items-center mr-4">
                      <i className="fa-solid fa-building mr-2"></i>
                      {job?.company}
                    </span>
                    <span className="flex items-center mr-4">
                      <i className="fa-solid fa-location-dot mr-2"></i>
                      {job?.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">{job?.salaryRange}</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Posted {job?.daysPostedAgo} days ago</span>
                  </div>
                </div>
              </div>
            </div>
              <JobApplicationForm formik={formik} handleResumeUpload={handleResumeUpload} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function JobApplication() {
  return (
    <SessionProvider>
      <JobApplicationDetails />
    </SessionProvider>
  );
}
