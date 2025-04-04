import Nav from "@/components/nav/nav";

export default function JobApplication() {
    return(
        <div className="bg-gray-900 min-h-screen text-gray-100">
          <Nav />
          <main id="application-form" className="pt-24 pb-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div id="job-header" className=" rounded-xl mb-8">
                  <div className="flex items-start gap-6">
                    <button className="text-purple-500 hover:text-gray-300">
                        <i className="fa-solid fa-arrow-left mr-2"></i>
                    </button>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold mb-2">Senior Software Engineer</h1>
                      <div className="flex items-center text-gray-400 mb-4">
                        <span className="flex items-center mr-4">
                          <i className="fa-solid fa-building mr-2"></i>
                          Google
                        </span>
                        <span className="flex items-center mr-4">
                          <i className="fa-solid fa-location-dot mr-2"></i>
                          Remote
                        </span>
                        <span className="flex items-center">
                          <i className="fa-solid fa-clock mr-2"></i>
                          Full-time
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">$120k-$180k</span>
                        <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Posted 2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                <form id="application-form" className="space-y-8">
                  <div id="personal-info" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-2">First Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Last Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Email</label>
                        <input type="email" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Phone</label>
                        <input type="tel" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                    </div>
                  </div>
                  <div id="resume-section" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-6">Resume/CV</h2>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8">
                      <div className="text-center">
                        <i className="fa-solid fa-cloud-arrow-up text-4xl text-purple-500 mb-4"></i>
                        <p className="text-gray-400 mb-4">Drag and drop your resume here or</p>
                        <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
                          Browse Files
                        </button>
                        <p className="text-sm text-gray-500 mt-4">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                      </div>
                    </div>
                  </div>
                  <div id="additional-info" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-6">Additional Information</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-400 mb-2">LinkedIn Profile</label>
                        <input type="url" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Portfolio Website</label>
                        <input type="url" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Cover Letter</label>
                        <textarea rows={6} className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                      </div>
                    </div>
                  </div>
                  <div id="submit-section" className="flex items-center justify-between bg-gray-800 rounded-xl p-6">
                    <div className="text-gray-400">
                      <i className="fa-solid fa-shield-halved mr-2"></i>
                      Your information is secure and encrypted
                    </div>
                    <div className="flex gap-4">
                      <button type="button" className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg">Save Draft</button>
                      <button type="submit" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center">
                        <i className="fa-solid fa-paper-plane mr-2"></i>
                        Submit Application
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>       
    )
}