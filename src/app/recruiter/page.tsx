'use client';

import Image from "next/image";
import Link from "next/link";
import { useRecruiter } from "./useRecruiter";
import Nav from "@/components/nav/nav";
import { SessionProvider, useSession } from "next-auth/react";
import { useState } from "react";

interface Match {
    application_id: string;
    candidate_name: string;
}

function RecruiterContent() {
    const { postedJobs, jobMatches } = useRecruiter();
    const { data: session } = useSession();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredJobs = postedJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-900 text-gray-100">
            <Nav />
            <div id="dashboard" className="pt-20 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Welcome, {session?.user?.firstName} {session?.user?.lastName}!</h1>
                    <Link href={'/job/post'}>
                        <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center">
                        <i className="fa-solid fa-plus mr-2"></i>
                        Post New Job
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div id="active-jobs" className="lg:col-span-2">
                    <div className="bg-gray-800 rounded-xl p-6 mb-6">
                        <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Active Job Listings</h2>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                                />
                                <i className="fa-solid fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                        </div>
                        </div>
                        <div id="job-list" className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {filteredJobs
                            .filter(job => job.id !== null)
                            .map((job) => {
                                // console.log('Job ID:', job.id);
                                return (
                                <div key={job.id} className="bg-gray-900 rounded-lg p-4 hover:bg-gray-900/80 transition">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <Link href={`/job/${job.id}/details`}>
                                                <h3 className="font-semibold">{job.title}</h3>
                                            </Link>
                                            <p className="text-gray-400 text-sm">Posted {job.daysPostedAgo} days ago</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="relative group">
                                                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                                                    {jobMatches[Number(job.id)]?.matches.length || 0} Matches
                                                </span>
                                            </div>
                                            <button className="text-gray-400 hover:text-purple-500">
                                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span key={`${job.id}-location`} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                            {job.location}
                                        </span>
                                        <span key={`${job.id}-type`} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                            Full-time
                                        </span>
                                        <span key={`${job.id}-salary`} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                            {job.salaryRange}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex -space-x-2">
                                            {jobMatches[job.id]?.matches?.slice(0, 3).map((match: Match) => (
                                                <Image
                                                    key={match.application_id}
                                                    src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-${(parseInt(match.application_id.slice(-2), 16) % 8) + 1}.jpg`}
                                                    className="w-8 h-8 rounded-full border-2 border-gray-900"
                                                    alt={match.candidate_name}
                                                    width={10}
                                                    height={10}
                                                />
                                            ))}
                                            {jobMatches[job.id]?.matches && jobMatches[job.id].matches.length > 3 && (
                                                <span key={`${job.id}-more`} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-700 flex items-center justify-center text-sm">
                                                    +{jobMatches[job.id].matches.length - 3}
                                                </span>
                                            )}
                                        </div>
                                        <Link href={`/job/${job.id}/matches/`}>
                                            <button className="text-purple-500 hover:text-purple-400">
                                                View Matches →
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                        </div>
                    </div>
                    </div>
                    <div id="matches-overview" className="space-y-6">
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4">Top Candidates</h2>
                            <div className="relative group">
                                <div className="blur-sm">
                                    <div className="space-y-4">
                                    <div
                                        key="candidate-1"
                                        className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition cursor-pointer"
                                    >
                                        <Image
                                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg"
                                            className="w-10 h-10 rounded-full"
                                            alt="Candidate"
                                            width={10}
                                            height={10}
                                        />
                                        <div className="flex-1">
                                        <h4 className="font-semibold">Sarah Chen</h4>
                                        <p className="text-sm text-gray-400">Full Stack Developer</p>
                                        </div>
                                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                                        95% Match
                                        </span>
                                    </div>
                                    <div
                                        key="candidate-2"
                                        className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition cursor-pointer"
                                    >
                                        <Image
                                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                                            className="w-10 h-10 rounded-full"
                                            alt="Candidate"
                                            width={10}
                                            height={10}
                                        />
                                        <div className="flex-1">
                                        <h4 className="font-semibold">Michael Park</h4>
                                        <p className="text-sm text-gray-400">Senior Designer</p>
                                        </div>
                                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                                        92% Match
                                        </span>
                                    </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
                                        This feature is coming soon!
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="quick-stats" className="bg-gray-800 rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                            <div className="relative group">
                                <div className="blur-sm">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div key="active-jobs" className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-gray-400 text-sm">Active Jobs</p>
                                        <p className="text-2xl font-bold">12</p>
                                        </div>
                                        <div key="total-matches" className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-gray-400 text-sm">Total Matches</p>
                                        <p className="text-2xl font-bold">48</p>
                                        </div>
                                        <div key="interviews" className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-gray-400 text-sm">Interviews</p>
                                        <p className="text-2xl font-bold">8</p>
                                        </div>
                                        <div key="hired" className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-gray-400 text-sm">Hired</p>
                                        <p className="text-2xl font-bold">3</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
                                        This feature is coming soon!
                                    </div>
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

export default function RecruiterPage() {
    return (
        <SessionProvider>
            <RecruiterContent />
        </SessionProvider>
    );
}