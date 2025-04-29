"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Nav from "@/components/nav/nav";
import CollapsibleSection from "@/components/ui/collapsible-section";
import { JobDetailsUI, JobDetails, jobStatusLabels } from "@/app/api/job/types";
import jobsService from "@/app/api/job/jobsApi";
import useCompanyDetails from "./useCompanyDetails";
import { SessionProvider } from "next-auth/react";

function JobDetailsContent() {
  const params = useParams();
  const [job, setJob] = useState<JobDetailsUI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { company, loading: companyLoading, error: companyError } = useCompanyDetails();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobId = params.jobId as string;
        const data = await jobsService.getJobDetails(jobId);
        
        // Transform JobDetails to JobDetailsUI
        const jobDetailsUI: JobDetailsUI = {
          ...data,
          skills: data.skills.split(',').map(skill => skill.trim()),
          experience: data.experience.split(',').map(exp => exp.trim()),
          benefitsAndPerks: data.benefitsAndPerks.split(',').map(benefit => benefit.trim()),
          statusInfo: jobStatusLabels[data.status] || {
            label: "Unknown",
            colorClass: "bg-gray-500/20 text-gray-400"
          }
        };
        
        setJob(jobDetailsUI);
      } catch (err) {
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [params.jobId]);

  if (loading) {
    return (
      <div className="bg-gray-900 text-gray-100">
        <Nav />
        <div className="pt-20 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="bg-gray-900 text-gray-100">
        <Nav />
        <div className="pt-20 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="text-red-400">{error || "Job not found"}</div>
          </div>
        </div>
      </div>
    );
  }

  if (companyLoading) return <p>Loading company details...</p>;
  if (companyError) return <p>{companyError}</p>;
  if (!company) return <p>Company details not available</p>;

  return (
    <div className="bg-gray-900 text-gray-100">
      <Nav />
      <div className="pt-20 min-h-screen">
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
                    {company.companyName}
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
              <CollapsibleSection title="Overview" defaultOpen={true}>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">{job.statusInfo.label}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{job.overview}</p>
              </CollapsibleSection>

              <CollapsibleSection title="Job Description" defaultOpen={true}>
                <div className="space-y-4 text-gray-300">
                  <p className="leading-relaxed">{job.description}</p>
                </div>
              </CollapsibleSection>

              <div id="requirements" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-purple-400 font-medium">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((req: string, i: number) => (
                        <span
                          key={`${req}-${i}`}
                          className="px-3 py-1.5 bg-gray-700 rounded-full text-sm"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-purple-400 font-medium">Experience</h3>
                    <ul className="space-y-2 text-gray-300">
                      {job.experience.map((req: string, i: number) => (
                        <li key={`${req}-${i}`} className="flex items-center">
                          <i className="fa-solid fa-check text-purple-500 mr-2"></i>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div id="sidebar" className="space-y-6">
              <div id="apply-card" className="bg-gray-800 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-700">
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

              <div id="benefits" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Benefits & Perks</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <i className="fa-solid fa-heart text-purple-500"></i>
                    <span>Health Insurance</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <i className="fa-solid fa-piggy-bank text-purple-500"></i>
                    <span>401(k) Matching</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <i className="fa-solid fa-chart-line text-purple-500"></i>
                    <span>Stock Options</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <i className="fa-solid fa-house-laptop text-purple-500"></i>
                    <span>Remote Work</span>
                  </div>
                </div>
              </div>

              <div id="company-info" className="bg-gray-800 rounded-xl p-6">
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

  