'use client';

import Nav from "@/components/nav/nav";
import Image from "next/image";
import { useApplicationData } from "./useApplicationData";
import { useParams } from "next/navigation";
import { useResume } from "@/app/profile/useResume";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/buttons";
import { useEffect, useState } from 'react';

function CandidateApplicationDetails() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { jobId, applicationId } = params;

  const { application, job, candidate, loading, error, errorDetails } = useApplicationData(
    jobId as string,
    applicationId as string
  );

  const { handleDownloadClick: getSignedUrl } = useResume({ 
    fileInputRef: { current: null },
    currentFile: application?.resumeUrl 
  });

  const handleDownloadClick = async () => {
    if (!application?.resumeUrl) return;
    
    try {
      const response = await getSignedUrl();
      if (!response) return;
      
      const link = document.createElement('a');
      link.href = response.signed_url;
      link.target = '_blank';  
      link.download = application.resumeUrl.split('/').pop() || 'resume';
 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  const isRecruiter = session?.user.isRecruiter;

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
            {application?.candidateId && (
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
                <BackButton onClick={() => router.back()} />
              <div className="flex items-center">
                <Image width={40} height={40} src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-20 h-20 rounded-full mr-4" alt="Candidate" />
                <div>
                  <h1 className="text-3xl font-bold">{application.firstName} {application.lastName}</h1>
                  <p className="text-gray-400">Application for {job.title}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {/* <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">In Review</span> */}
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                Applied {application?.status?.lastUpdated ? new Date(application.status.lastUpdated).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'N/A'}
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                {application?.status?.currentStage || 'N/A'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div id="main-content" className="lg:col-span-2 space-y-6">
              <div id="job-details" className="bg-gray-800 rounded-xl p-6">
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

              <div id="skills-section" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Technical Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {candidate.skills && candidate.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 rounded-lg">
                      <i className="fa-solid fa-check text-green-400 text-sm"></i>
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {application.links && (
                  <div id="links-section" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Links</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-gray-400 text-sm">LinkedIn</h3>
                        {application.links.linkedIn ? (
                          <a 
                            href={application.links.linkedIn} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            {application.links.linkedIn}
                          </a>
                        ) : (
                          <p className="text-gray-300">Not provided</p>
                        )}
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm">GitHub</h3>
                        {application.links.github ? (
                          <a 
                            href={application.links.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            {application.links.github}
                          </a>
                        ) : (
                          <p className="text-gray-300">Not provided</p>
                        )}
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm">Website</h3>
                        {application.links.website ? (
                          <a 
                            href={application.links.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300"
                          >
                            {application.links.website}
                          </a>
                        ) : (
                          <p className="text-gray-300">Not provided</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {candidate.demographics && (
                  <div id="demographics-section" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Demographics</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-gray-400 text-sm">Work Authorization</h3>
                        <p className="text-gray-300">{candidate.demographics.authorization ? candidate.demographics.authorization.charAt(0).toUpperCase() + candidate.demographics.authorization.slice(1) : 'Not answered'}</p>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm">Gender</h3>
                        <p className="text-gray-300">{candidate.demographics.gender ? candidate.demographics.gender.charAt(0).toUpperCase() + candidate.demographics.gender.slice(1) : 'Not answered'}</p>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm">Hispanic or Latino</h3>
                        <p className="text-gray-300">{candidate.demographics.isHispanic ? candidate.demographics.isHispanic.charAt(0).toUpperCase() + candidate.demographics.isHispanic.slice(1) : 'Not answered'}</p>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm">Ethnicity</h3>
                        <p className="text-gray-300">{candidate.demographics.ethnicity ? candidate.demographics.ethnicity.charAt(0).toUpperCase() + candidate.demographics.ethnicity.slice(1) : 'Not answered'}</p>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm">Disability Status</h3>
                        <p className="text-gray-300">{candidate.demographics.disability ? candidate.demographics.disability.charAt(0).toUpperCase() + candidate.demographics.disability.slice(1) : 'Not answered'}</p>
                      </div>
                      <div>
                        <h3 className="text-gray-400 text-sm">Veteran Status</h3>
                        <p className="text-gray-300">{candidate.demographics.veteran ? candidate.demographics.veteran.charAt(0).toUpperCase() + candidate.demographics.veteran.slice(1) : 'Not answered'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div id="side-panel" className="space-y-6">
              <div id="quick-actions" className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Actions</h2>
                <div className="space-y-3">
                  {application.resumeUrl && (
                    <button 
                      onClick={handleDownloadClick}
                      className="w-full px-4 py-3 bg-purple-600/50 hover:bg-purple-600/50 rounded-lg flex items-center justify-center"
                    >
                      <i className="fa-solid fa-file-arrow-down mr-2"></i>
                      Download Resume
                    </button>
                  )}
                  {isRecruiter && (
                    <>
                      <button 
                        className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center cursor-not-allowed relative group"
                        disabled
                      >
                        <i className="fa-solid fa-calendar-plus mr-2"></i>
                        Schedule Interview
                        <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Feature coming soon!
                        </span>
                      </button>
                      <button 
                        className="w-full px-4 py-3 bg-gray-700/50 hover:bg-gray-700/50 rounded-lg flex items-center justify-center cursor-not-allowed relative group"
                        disabled
                      >
                        <i className="fa-solid fa-envelope mr-2"></i>
                        Send Message
                        <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Feature coming soon!
                        </span>
                      </button>
                    </>
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
export default function CandidateApplication() {
  return (
    <SessionProvider>
      <CandidateApplicationDetails />
    </SessionProvider>
  )
}   