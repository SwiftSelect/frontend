import Image from "next/image";
export default function RecruiterPage() {
    return (
        <div className="bg-gray-900 text-gray-100">
            <div id="dashboard" className="pt-20 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
                    <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center">
                    <i className="fa-solid fa-plus mr-2"></i>
                    Post New Job
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div id="active-jobs" className="lg:col-span-2">
                    <div className="bg-gray-800 rounded-xl p-6 mb-6">
                        <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Active Job Listings</h2>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-gray-700 rounded-lg text-sm hover:bg-gray-600">
                            Filter
                            </button>
                            <button className="px-3 py-1 bg-gray-700 rounded-lg text-sm hover:bg-gray-600">
                            Sort
                            </button>
                        </div>
                        </div>
                        <div id="job-list" className="space-y-4">
                        <div
                            id="job-1"
                            className="bg-gray-900 rounded-lg p-4 hover:bg-gray-900/80 transition"
                        >
                            <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-semibold">
                                Senior Full Stack Developer
                                </h3>
                                <p className="text-gray-400 text-sm">Posted 5 days ago</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                                12 Matches
                                </span>
                                <button className="text-gray-400 hover:text-purple-500">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                            </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                Remote
                            </span>
                            <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                Full-time
                            </span>
                            <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                $120k-$150k
                            </span>
                            </div>
                            <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                                <Image
                                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                                    className="w-8 h-8 rounded-full border-2 border-gray-900"
                                    alt="Candidate"
                                    width={10}
                                    height={10}
                                />
                                <Image
                                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                                    className="w-8 h-8 rounded-full border-2 border-gray-900"
                                    alt="Candidate"
                                    width={10}
                                    height={10}
                                />
                                <Image
                                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                                    className="w-8 h-8 rounded-full border-2 border-gray-900"
                                    alt="Candidate"
                                    width={10}
                                    height={10}
                                />
                                <span className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-700 flex items-center justify-center text-sm">
                                +9
                                </span>
                            </div>
                            <button className="text-purple-500 hover:text-purple-400">
                                View Matches →
                            </button>
                            </div>
                        </div>
                        <div
                            id="job-2"
                            className="bg-gray-900 rounded-lg p-4 hover:bg-gray-900/80 transition"
                        >
                            <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-semibold">UX/UI Designer</h3>
                                <p className="text-gray-400 text-sm">Posted 3 days ago</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                                8 Matches
                                </span>
                                <button className="text-gray-400 hover:text-purple-500">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                            </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                Hybrid
                            </span>
                            <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                Full-time
                            </span>
                            <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                                $90k-$120k
                            </span>
                            </div>
                            <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                                <Image
                                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                                    className="w-8 h-8 rounded-full border-2 border-gray-900"
                                    alt="Candidate"
                                    width={10}
                                    height={10}
                                />
                                <Image
                                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
                                    className="w-8 h-8 rounded-full border-2 border-gray-900"
                                    alt="Candidate"
                                    width={10}
                                    height={10}
                                />
                                <span className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-700 flex items-center justify-center text-sm">
                                +6
                                </span>
                            </div>
                            <button className="text-purple-500 hover:text-purple-400">
                                View Matches →
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div id="matches-overview" className="space-y-6">
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4">Top Candidates</h2>
                            <div className="space-y-4">
                            <div
                                id="candidate-1"
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
                                id="candidate-2"
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
                        <div id="quick-stats" className="bg-gray-800 rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-900 rounded-lg p-4">
                                <p className="text-gray-400 text-sm">Active Jobs</p>
                                <p className="text-2xl font-bold">12</p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4">
                                <p className="text-gray-400 text-sm">Total Matches</p>
                                <p className="text-2xl font-bold">48</p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4">
                                <p className="text-gray-400 text-sm">Interviews</p>
                                <p className="text-2xl font-bold">8</p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4">
                                <p className="text-gray-400 text-sm">Hired</p>
                                <p className="text-2xl font-bold">3</p>
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