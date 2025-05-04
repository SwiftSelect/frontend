"use client";

import { useParams } from "next/navigation";
import Nav from "@/components/nav/nav";
import useJobDetails from "./useJobDetails";
import useCompanyDetails from "./useCompanyDetails";
import { SessionProvider } from "next-auth/react";
import CollapsibleSection from "@/components/ui/collapsible-section";

function JobDetailsContent() {
  const { jobId } = useParams();
  const { job, loading: jobLoading, error: jobError } = useJobDetails(jobId as string);
  const { company, loading: companyLoading, error: companyError } = useCompanyDetails();

  if (jobLoading || companyLoading) {
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <Nav />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (jobError || !job) {
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <Nav />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500">{jobError || "Job not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  if (companyError || !company) {
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <Nav />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500">{companyError || "Company details not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-100">
      <Nav />
      <main className="pt-24 min-h-screen">
        <div id="job-details-view" className="pt-20 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div id="job-header" className="mb-8">
              <div className="flex items-center mb-6">
                <button className="text-purple-500 hover:text-purple-400 mr-4">
                  <i className="fa-solid fa-arrow-left text-xl"></i>
                </button>
                <div>
                  <h1 className="text-3xl font-bold">{job.title}</h1>
                  <div className="flex items-center mt-2 text-gray-400">
                    <span className="flex items-center">
                      <i className="fa-solid fa-building mr-2"></i>
                      {job.company}
                    </span>
                    <span className="mx-3">•</span>
                    <span className="flex items-center">
                      <i className="fa-solid fa-location-dot mr-2"></i>
                      {job.location}
                    </span>
                    <span className="mx-3">•</span>
                    <span className="flex items-center">
                      <i className="fa-regular fa-clock mr-2"></i>
                      Posted {job.daysPostedAgo} days ago
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div id="main-content" className="lg:col-span-2 space-y-6">
                <CollapsibleSection title="Overview">
                  <p className="text-gray-300 leading-relaxed">{job.overview}</p>
                </CollapsibleSection>

                <CollapsibleSection title="Job Description">
                  <div className="space-y-4 text-gray-300">
                    <p className="leading-relaxed">{job.description}</p>
                  </div>
                </CollapsibleSection>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-6">Requirements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-purple-400 font-medium">Technical Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill: string, i: number) => (
                          <span
                            key={`${skill}-${i}`}
                            className="px-3 py-1.5 bg-gray-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-purple-400 font-medium">Experience</h3>
                      <ul className="space-y-2 text-gray-300">
                        {job.experience.map((exp: string, i: number) => (
                          <li key={`${exp}-${i}`} className="flex items-center">
                            <i className="fa-solid fa-check text-purple-500 mr-2"></i>
                            {exp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div id="sidebar" className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Compensation</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Salary Range</p>
                        <p className="text-xl font-semibold">{job.salaryRange}</p>
                      </div>
                      <i className="fa-solid fa-money-bill-wave text-2xl text-purple-500"></i>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-paper-plane mr-2"></i>
                        Apply Now
                      </button>
                      <button className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center">
                        <i className="fa-regular fa-bookmark mr-2"></i>
                        Save Job
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Benefits & Perks</h2>
                  <div className="space-y-3">
                    {job.benefitsAndPerks.map((benefit: string, i: number) => (
                      <div key={`${benefit}-${i}`} className="flex items-center space-x-3 text-gray-300">
                        <i className="fa-solid fa-check text-purple-500"></i>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">About Company</h2>
                  <div className="flex items-center space-x-4 mb-4">
                    <img className="w-16 h-16 rounded-xl" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5d58064a24-427161b4c0a17740458a.png" alt="modern tech company logo with purple and dark theme" />
                    <div>
                      <h3 className="font-medium">{company.companyName}</h3>
                      <p className="text-sm text-gray-400">{company.companyIndustry} • {company.companySize}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{company.companyDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function JobDetailsPage() {
  return (
    <SessionProvider>
      <JobDetailsContent />
    </SessionProvider>
  );
}

  