import Nav from "@/components/nav/nav";
import Image from "next/image";
import Link from "next/link";
export default function MatchesPage() {
    return(
        <div className="bg-gray-900 text-gray-100">
          <Nav />
          <div id="job-matches" className="pt-20 min-h-screen">
            <div className="container mx-auto px-4 py-8">
              <div id="job-header" className="mb-8">
                <div className="flex items-center mb-4">
                  <button className="text-purple-500 hover:text-purple-400 mr-4">
                    <i className="fa-solid fa-arrow-left text-xl"></i>
                  </button>
                  <h1 className="text-3xl font-bold">Senior Full Stack Developer</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Remote</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Full-time</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">$120k-$150k</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">12 Matches</span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div id="candidates-list" className="lg:col-span-2">
                  <div className="bg-gray-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Matched Candidates</h2>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 flex items-center">
                          <i className="fa-solid fa-filter mr-2"></i>
                          Filter
                        </button>
                        <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 flex items-center">
                          <i className="fa-solid fa-sort mr-2"></i>
                          Sort
                        </button>
                      </div>
                    </div>
                    <div id="candidates-grid" className="space-y-4">
                      <div id="candidate-card-1" className="bg-gray-900 rounded-xl p-6 hover:bg-gray-900/80 transition">
                        <div className="flex items-start gap-4">
                          <Image width={40} height={40} src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-16 h-16 rounded-full" alt="Candidate" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="text-xl font-semibold">Emily Rodriguez</h3>
                                <p className="text-gray-400">Senior Developer at TechCorp</p>
                              </div>
                              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">98% Match</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">React</span>
                              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">Node.js</span>
                              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">TypeScript</span>
                              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">AWS</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                  <i className="fa-solid fa-briefcase text-gray-400 mr-2"></i>
                                  <span className="text-sm">8 years exp.</span>
                                </div>
                                <div className="flex items-center">
                                  <i className="fa-solid fa-location-dot text-gray-400 mr-2"></i>
                                  <span className="text-sm">San Francisco, CA</span>
                                </div>
                              </div>
                              <Link href={`/job/${1}/application/${1}`}>
                                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">View Application</button>
                              
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="candidate-card-2" className="bg-gray-900 rounded-xl p-6 hover:bg-gray-900/80 transition">
                        <div className="flex items-start gap-4">
                          <Image width={40} height={40} src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-16 h-16 rounded-full" alt="Candidate" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="text-xl font-semibold">Alex Chen</h3>
                                <p className="text-gray-400">Full Stack Lead at StartupX</p>
                              </div>
                              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">95% Match</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">Vue.js</span>
                              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">Python</span>
                              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">Docker</span>
                              <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">MongoDB</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                  <i className="fa-solid fa-briefcase text-gray-400 mr-2"></i>
                                  <span className="text-sm">6 years exp.</span>
                                </div>
                                <div className="flex items-center">
                                  <i className="fa-solid fa-location-dot text-gray-400 mr-2"></i>
                                  <span className="text-sm">Remote</span>
                                </div>
                              </div>
                              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">View Application</button>
                            </div>
                          </div>
                        </div>
                      </div>
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
                      <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-envelope mr-2"></i>
                        Message Selected
                      </button>
                      <button className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-calendar mr-2"></i>
                        Schedule Interviews
                      </button>
                      <button className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-file-export mr-2"></i>
                        Export List
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>    
    )
}