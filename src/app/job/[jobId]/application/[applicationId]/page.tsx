'use client';

import Nav from "@/components/nav/nav";
import Image from "next/image";
import { useApplicationData } from "./useApplicationData";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// Function to check if a string is a valid integer
const isValidInteger = (id: string): boolean => {
  return /^\d+$/.test(id);
};

export default function CandidateApplication() {
  const params = useParams();
  const router = useRouter();
  const { jobId, applicationId } = params;

  // useEffect(() => {
  //   if (!isValidInteger(candidateId as string)) {
  //     console.error('Invalid candidate ID format. Expected a numeric ID');
  //   }
  // }, [candidateId]);

  const { application, job, candidate, loading, error, errorDetails } = useApplicationData(
    jobId as string,
    applicationId as string
  );

  if (loading) {
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <Nav />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2 mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !application || !job || !candidate) {
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <Nav />
        <div className="container mx-auto px-4 py-8">
          <div className="text-red-500 space-y-4">
            <h2 className="text-xl font-semibold">Error loading application data</h2>
            <p>Error: {error}</p>
            {errorDetails && (
              <div className="space-y-2">
                {errorDetails.jobError && <p>Job Error: {errorDetails.jobError}</p>}
                {errorDetails.applicationError && <p>Application Error: {errorDetails.applicationError}</p>}
                {errorDetails.candidateError && <p>Candidate Error: {errorDetails.candidateError}</p>}
              </div>
            )}
            <p className="text-sm text-gray-400">Job ID: {jobId}</p>
            <p className="text-sm text-gray-400">Candidate ID: {application?.candidateId}</p>
            {!isValidInteger(application?.candidateId as string) && (
              <p className="text-yellow-500">Warning: The candidate ID must be a numeric value</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-100">
      <Nav />
      <div id="candidate-profile" className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div id="profile-header" className="mb-8">
            <div className="flex items-center mb-4">
              <button className="text-purple-500 hover:text-purple-400 mr-4">
                <i className="fa-solid fa-arrow-left text-xl"></i>
              </button>
              <div className="flex items-center">
                <Image width={40} height={40} src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-20 h-20 rounded-full mr-4" alt="Candidate" />
                <div>
                  <h1 className="text-3xl font-bold">{candidate.current_position || 'Candidate'}</h1>
                  <p className="text-gray-400">Application for {job.title}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">In Review</span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Applied {new Date(application.status.lastUpdated).toLocaleDateString()}</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">{application.status.currentStage}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div id="main-content" className="lg:col-span-2 space-y-6">
              <div id="profile-summary" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                <p className="text-gray-300 leading-relaxed">{job.overview}</p>
              </div>

              <div id="skills-section" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Technical Skills</h2>
                <div className="grid grid-cols-2 gap-4">
                  {candidate.skills && candidate.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{skill}</span>
                        <span className="text-purple-400">Proficient</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full w-80/1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="experience-section" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Job Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Company</h3>
                    <p className="text-purple-400">{job.company}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Location</h3>
                    <p className="text-gray-300">{job.location}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Salary Range</h3>
                    <p className="text-gray-300">{job.salaryRange}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Required Experience</h3>
                    <p className="text-gray-300">{job.experience}</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="side-panel" className="space-y-6">
              <div id="application-status" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Application Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center text-green-400">
                    <i className="fa-solid fa-circle-check mr-2"></i>
                    <span>Application Received</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <i className="fa-solid fa-circle-check mr-2"></i>
                    <span>Resume Screened</span>
                  </div>
                  <div className="flex items-center text-purple-400">
                    <i className="fa-solid fa-circle-half-stroke mr-2"></i>
                    <span>{application.status.currentStage}</span>
                  </div>
                </div>
              </div>

              <div id="quick-actions" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Actions</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-calendar-plus mr-2"></i>
                    Schedule Interview
                  </button>
                  <button className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-envelope mr-2"></i>
                    Send Message
                  </button>
                  {application.resumeUrl && (
                    <a 
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center"
                    >
                      <i className="fa-solid fa-file-arrow-down mr-2"></i>
                      Download Resume
                    </a>
                  )}
                </div>
              </div>

              <div id="contact-info" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-gray-300">{application.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <p className="text-gray-300">{application.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}