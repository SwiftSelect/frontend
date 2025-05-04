'use client';
import Nav from "@/components/nav/nav";
import Image from "next/image";
import Link from "next/link";
import { useMatches } from "./useMatches";
import { useParams } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/buttons";

function MatchesPageDetails() {
    const router = useRouter(); 
    const { jobId } = useParams();
    const { jobTitle, jobLocation, jobType, salaryRange, totalMatches, matches, loading, error } = useMatches();

    if (loading) {
        return (
            <div className="bg-gray-900 text-gray-100">
                <Nav />
                <div className="pt-20 min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900 text-gray-100">
                <Nav />
                <div className="pt-20 min-h-screen flex items-center justify-center">
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return(
        <div className="bg-gray-900 text-gray-100">
          <Nav />
          <div id="job-matches" className="pt-20 min-h-screen">
            <div className="container mx-auto px-4 py-8">
              <div id="job-header" className="mb-8">
                <div className="flex items-center mb-4">
                  <BackButton onClick={() => router.back()} />
                  <h1 className="text-3xl font-bold">{jobTitle}</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  {jobLocation && <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">{jobLocation}</span>}
                  {jobType && <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">{jobType}</span>}
                  {salaryRange && <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">{salaryRange}</span>}
                  {totalMatches > 0 && <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">{totalMatches} Matches</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div id="candidates-list" className="lg:col-span-2">
                  <div className="bg-gray-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Matched Candidates</h2>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 flex items-center relative group">
                          <i className="fa-solid fa-filter mr-2"></i>
                          Filter
                          <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-sm text-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Feature coming soon
                          </span>
                        </button>
                        <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 flex items-center relative group">
                          <i className="fa-solid fa-sort mr-2"></i>
                          Sort
                          <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-sm text-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Feature coming soon
                          </span>
                        </button>
                      </div>
                    </div>
                    <div id="candidates-grid" className="space-y-4">
                      {matches.map((candidate) => (
                        <div key={candidate.id} className="bg-gray-900 rounded-xl p-6 hover:bg-gray-900/80 transition">
                          <div className="flex items-start gap-4">
                            <Image width={40} height={40} src={candidate.avatar} className="w-16 h-16 rounded-full" alt="Candidate" />
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h3 className="text-xl font-semibold">{candidate.name}</h3>
                                </div>
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">{(candidate.matchPercentage * 100).toFixed(2)}% Match</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {candidate.skills.map((skill, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-700 rounded-full text-xs">{skill}</span>
                                ))}
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                  {/* {candidate.experience && (
                                    <div className="flex items-center">
                                      <i className="fa-solid fa-briefcase text-gray-400 mr-2"></i>
                                      <span className="text-sm">{candidate.currentPosition}</span>
                                    </div>
                                  )}
                                  {candidate.location && (
                                    <div className="flex items-center">
                                      <i className="fa-solid fa-location-dot text-gray-400 mr-2"></i>
                                      <span className="text-sm">{candidate.location}</span>
                                    </div>
                                  )} */}
                                </div>
                                <Link href={`/job/${jobId}/application/${candidate.id}`}>
                                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">View Application</button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div id="match-details" className="space-y-6">
                  <div id="match-filters" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Match Criteria</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Technical Skills</span>
                        <span className="text-purple-400">95%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full w-95/1"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Experience Level</span>
                        <span className="text-purple-400">90%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full w-90/1"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Location Match</span>
                        <span className="text-purple-400">85%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full w-85/1"></div>
                      </div>
                    </div>
                  </div>
                  <div id="quick-actions" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center relative group">
                        <i className="fa-solid fa-envelope mr-2"></i>
                        Message Selected
                        <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-sm text-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Feature coming soon
                        </span>
                      </button>
                      <button className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center relative group">
                        <i className="fa-solid fa-calendar mr-2"></i>
                        Schedule Interviews
                        <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-sm text-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Feature coming soon
                        </span>
                      </button>
                      <button className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center relative group">
                        <i className="fa-solid fa-file-export mr-2"></i>
                        Export List
                        <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-sm text-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Feature coming soon
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>    
    )
};

export default function MatchesPage() {
    return (
        <SessionProvider>
            <MatchesPageDetails />
        </SessionProvider>
    )
}