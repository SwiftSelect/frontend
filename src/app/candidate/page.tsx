import Nav from "@/components/nav/nav"

export default function CandidatePage() {
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
                        <h1 className="text-2xl font-bold mb-2">Welcome back, Alex!</h1>
                        <p className="text-gray-400">Your job search activity this week</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-500">12</div>
                          <div className="text-sm text-gray-400">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-500">5</div>
                          <div className="text-sm text-gray-400">Applications</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-500">3</div>
                          <div className="text-sm text-gray-400">Interviews</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="recommended-jobs" className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Recommended Jobs</h2>
                      <button className="text-purple-500 hover:text-purple-400">View all</button>
                    </div>
                    <div className="grid gap-4">
                      <div id="job-card-1" className="bg-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                              <i className="fa-brands fa-microsoft text-2xl text-purple-600"></i>
                            </div>
                            <div>
                              <h3 className="font-semibold">Senior Frontend Developer</h3>
                              <p className="text-gray-400">Microsoft</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">98% Match</span>
                            <button className="text-purple-500">
                              <i className="fa-regular fa-bookmark"></i>
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Remote</span>
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Full-time</span>
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">$130k-$180k</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Posted 1 day ago</span>
                          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">Quick Apply</button>
                        </div>
                      </div>
                      <div id="job-card-2" className="bg-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                              <i className="fa-brands fa-apple text-2xl text-blue-600"></i>
                            </div>
                            <div>
                              <h3 className="font-semibold">UI/UX Designer</h3>
                              <p className="text-gray-400">Apple</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">95% Match</span>
                            <button className="text-purple-500">
                              <i className="fa-regular fa-bookmark"></i>
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Hybrid</span>
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Full-time</span>
                          <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">$110k-$160k</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Posted 2 days ago</span>
                          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">Quick Apply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/4">
                  <div id="applications-status" className="bg-gray-800 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-bold mb-6">Applications Status</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Applied</span>
                        <span className="text-purple-500 font-semibold">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">In Review</span>
                        <span className="text-purple-500 font-semibold">5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Interviews</span>
                        <span className="text-purple-500 font-semibold">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Offers</span>
                        <span className="text-purple-500 font-semibold">1</span>
                      </div>
                    </div>
                  </div>
                  {/* <div id="upcoming-interviews" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6">Upcoming Interviews</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Microsoft</h3>
                          <span className="text-purple-500">Tomorrow</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Technical Interview</p>
                        <p className="text-sm text-gray-400">2:00 PM - 3:30 PM</p>
                      </div>
                      <div className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Apple</h3>
                          <span className="text-purple-500">Feb 15</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Design Challenge</p>
                        <p className="text-sm text-gray-400">11:00 AM - 12:30 PM</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>    
    );
}