'use client'
import Nav from "@/components/nav/nav"
import { useCandidate } from "./useCandidate"
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

function CandidatePageDetails() {
    const { applications, loading, error, jobs, user, jobRecommendations, jobSummaries } = useCandidate();


    return (
    <div className="bg-gray-900 text-gray-100">
          <Nav />
          <div id="dashboard" className="pt-24 min-h-screen">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-3/4">
                  <div id="welcome-section" className="bg-gray-800 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.firstName} {user?.lastName}!</h1>
                        <p className="text-gray-400">Your job search activity this week</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-500">{applications.length}</div>
                          <div className="text-sm text-gray-400">Applications</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-500">{jobRecommendations.recommendations.length}</div>
                          <div className="text-sm text-gray-400">Recommendations</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Applied Jobs Section */}
                  <div id="applied-jobs" className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Applied Jobs</h2>
                    </div>
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                        <p className="mt-4 text-gray-400">Loading your applications...</p>
                      </div>
                    ) : error ? (
                      <div className="text-center py-8">
                        <p className="text-red-500">Error: {error}</p>
                      </div>
                    ) : applications.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400">You haven&apos;t applied to any jobs yet.</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {applications.map((application) => {
                          const job = jobs[application.jobId];
                          if (!job) return null;
                          
                          return (
                            <div key={application.applicationId} className="bg-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                    <i className="fa-solid fa-building text-2xl text-purple-600"></i>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">{job.title}</h3>
                                    <p className="text-gray-400">{job.company}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-3 py-1 rounded-full text-sm ${
                                    application.status.currentStage === 'Applied' ? 'bg-blue-500/20 text-blue-400' :
                                    application.status.currentStage === 'Interview' ? 'bg-yellow-500/20 text-yellow-400' :
                                    application.status.currentStage === 'Offer' ? 'bg-green-500/20 text-green-400' :
                                    'bg-gray-500/20 text-gray-400'
                                  }`}>
                                    {application.status.currentStage}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">{job.location}</span>
                                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Full-time</span>
                                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">{job.salaryRange}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Applied on {new Date(application.status.lastUpdated).toLocaleDateString()}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div id="recommended-jobs" className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Recommended Jobs</h2>
                    </div>

                    <div className="grid gap-4">
                    {
                        !loading && jobRecommendations.recommendations.map((recommendation) => (
                            <div key={recommendation.job_id} id="job-card-1" className="bg-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition">
                                <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                    <i className="fa-brands fa-microsoft text-2xl text-purple-600"></i>
                                    </div>
                                    <div>
                                        <Link href={`/job/${recommendation.job_id}/details`}>
                                            <h3 className="font-semibold">{jobSummaries.get(recommendation.job_id.toString())?.title}</h3>
                                        </Link>
                                        <p className="text-gray-400">{jobSummaries.get(recommendation.job_id.toString())?.company}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">{(recommendation.similarity_score * 100).toFixed(2)}% Match</span>
                                    <button className="text-purple-500">
                                    <i className="fa-regular fa-bookmark"></i>
                                    </button>
                                </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">{jobSummaries.get(recommendation.job_id.toString())?.location}</span>
                                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">{jobSummaries.get(recommendation.job_id.toString())?.salaryRange}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Posted {jobSummaries.get(recommendation.job_id.toString())?.daysPostedAgo} days ago</span>
                                <Link href={`/job/${recommendation.job_id}/details`}>
                                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">Quick Apply</button>
                                </Link>
                                </div>
                            </div>
                        ))
                    }
                    {
                        loading && (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                                <p className="mt-4 text-gray-400">Loading your job recommendations...</p>
                            </div>
                        )
                    }
                    {
                        !loading && jobRecommendations.recommendations.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-400">No job recommendations as of now, try updating your profile.</p>
                            </div>
                        )
                    }
                    </div>
                    </div>
                </div>
                <div className="lg:w-1/4">
                  <div id="applications-status" className="bg-gray-800 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-bold mb-6">Applications Status</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Applied</span>
                        <span className="text-purple-500 font-semibold">{applications.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">In Review</span>
                        <span className="text-purple-500 font-semibold">{applications.filter(app => app.status.currentStage === 'In Review').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Interviews</span>
                        <span className="text-purple-500 font-semibold">{applications.filter(app => app.status.currentStage === 'Interview').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Offers</span>
                        <span className="text-purple-500 font-semibold">{applications.filter(app => app.status.currentStage === 'Offer').length}</span>
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

export default function CandidatePage() {
    return (
        <SessionProvider>
            <CandidatePageDetails />
        </SessionProvider>
    );
}