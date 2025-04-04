import Nav from "@/components/nav/nav";
import Image from "next/image";

export default function CandidateMatch(){
    return(
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
                      <h1 className="text-3xl font-bold">Emily Rodriguez</h1>
                      <p className="text-gray-400">Application for Senior Full Stack Developer</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">98% Match</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Applied Jan 15, 2025</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">In Review</span>
                </div>
              </div>
        
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div id="main-content" className="lg:col-span-2 space-y-6">
                  <div id="profile-summary" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                    <p className="text-gray-300 leading-relaxed">Senior Full Stack Developer with 8 years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Led multiple teams and delivered enterprise-level solutions for Fortune 500 companies.</p>
                  </div>
        
                  <div id="skills-section" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Technical Skills</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>React</span>
                            <span className="text-purple-400">Expert</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full w-95/1"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Node.js</span>
                            <span className="text-purple-400">Advanced</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full w-85/1"></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>TypeScript</span>
                            <span className="text-purple-400">Expert</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full w-90/1"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>AWS</span>
                            <span className="text-purple-400">Advanced</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full w-80/1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        
                  <div id="experience-section" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
                    <div className="space-y-6">
                      <div className="border-l-2 border-purple-500 pl-4">
                        <h3 className="text-lg font-semibold">Senior Developer</h3>
                        <p className="text-purple-400">TechCorp</p>
                        <p className="text-gray-400 text-sm">2021 - Present</p>
                        <ul className="mt-2 text-gray-300 space-y-1">
                          <li>• Led development of microservices architecture</li>
                          <li>• Managed team of 6 developers</li>
                          <li>• Reduced system response time by 40%</li>
                        </ul>
                      </div>
                      <div className="border-l-2 border-gray-700 pl-4">
                        <h3 className="text-lg font-semibold">Full Stack Developer</h3>
                        <p className="text-gray-400">InnovateX</p>
                        <p className="text-gray-400 text-sm">2018 - 2021</p>
                        <ul className="mt-2 text-gray-300 space-y-1">
                          <li>• Developed e-commerce platform</li>
                          <li>• Implemented CI/CD pipeline</li>
                        </ul>
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
                        <span>Technical Assessment</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <i className="fa-regular fa-circle mr-2"></i>
                        <span>Interview</span>
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
                      <button className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-file-arrow-down mr-2"></i>
                        Download Resume
                      </button>
                    </div>
                  </div>
        
                  <div id="hiring-team" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Hiring Team</h2>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Image width={20} height={20} src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-10 h-10 rounded-full mr-3" alt="Team member" />
                        <div>
                          <p className="font-semibold">David Kim</p>
                          <p className="text-gray-400 text-sm">Hiring Manager</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Image width={20} height={20} src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" className="w-10 h-10 rounded-full mr-3" alt="Team member" />
                        <div>
                          <p className="font-semibold">Sarah Johnson</p>
                          <p className="text-gray-400 text-sm">Tech Lead</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>   
    )
}