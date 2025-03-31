import Nav from "@/components/nav/nav";

export default function PostJobPage() {
  return (
    <div className="bg-gray-900 text-gray-100">
      <Nav /> 
        <div id="post-job" className="pt-20 min-h-screen">
            <div className="container mx-auto px-4 py-8">
            <div id="post-job-header" className="mb-8">
                <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button className="text-purple-500 hover:text-purple-400 mr-4">
                    <i className="fa-solid fa-arrow-left text-xl"></i>
                    </button>
                    <h1 className="text-3xl font-bold">Post New Job</h1>
                </div>
                <button className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center">
                    <i className="fa-solid fa-eye mr-2"></i>
                    Preview
                </button>
                </div>
            </div>
        
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div id="job-form" className="lg:col-span-2 space-y-6">
                <div id="basic-info" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
                    <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Job Title</label>
                        <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none" placeholder="e.g. Senior Full Stack Developer" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                        <label className="block text-sm font-medium mb-2">Department</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none">
                            <option>Engineering</option>
                            <option>Design</option>
                            <option>Product</option>
                            <option>Marketing</option>
                        </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none">
                            <option>Remote</option>
                            <option>Hybrid</option>
                            <option>On-site</option>
                        </select>
                        </div>
                    </div>
                    </div>
                </div>
        
                <div id="job-details" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-6">Job Details</h2>
                    <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Job Description</label>
                        <textarea className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none h-32" placeholder="Describe the role and responsibilities..."></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Requirements</label>
                        <textarea className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none h-32" placeholder="List the key requirements..."></textarea>
                    </div>
                    </div>
                </div>
        
                <div id="compensation" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-6">Compensation</h2>
                    <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                        <label className="block text-sm font-medium mb-2">Salary Range (From)</label>
                        <input type="text" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500" placeholder="e.g. $80,000" />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-2">Salary Range (To)</label>
                        <input type="text" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500" placeholder="e.g. $120,000" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Benefits</label>
                        <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-full text-sm cursor-pointer hover:bg-purple-500/30">Health Insurance</span>
                        <span className="px-3 py-1.5 bg-gray-700 rounded-full text-sm cursor-pointer hover:bg-gray-600">401(k)</span>
                        <span className="px-3 py-1.5 bg-gray-700 rounded-full text-sm cursor-pointer hover:bg-gray-600">Stock Options</span>
                        <span className="px-3 py-1.5 bg-gray-700 rounded-full text-sm cursor-pointer hover:bg-gray-600">Remote Work</span>
                        <span className="px-3 py-1.5 bg-gray-700 rounded-full text-sm cursor-pointer hover:bg-gray-600">+ Add More</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        
                <div id="sidebar" className="space-y-6">
                <div id="publish-settings" className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Publishing Settings</h2>
                    <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span>Visibility</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Featured Job</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>
                    </div>
                </div>
        
                <div id="actions" className="bg-gray-800 rounded-xl p-6">
                    <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-paper-plane mr-2"></i>
                        Publish Job
                    </button>
                    <button className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-floppy-disk mr-2"></i>
                        Save as Draft
                    </button>
                    </div>
                </div>
        
                <div id="tips" className="bg-purple-500/10 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                    <i className="fa-solid fa-lightbulb text-purple-400 text-xl mt-1"></i>
                    <div>
                        <h3 className="text-purple-400 font-medium mb-2">Pro Tips</h3>
                        <ul className="text-sm space-y-2 text-gray-300">
                        <li>• Be specific about requirements</li>
                        <li>• Include salary range for better matches</li>
                        <li>• Highlight unique benefits</li>
                        <li>• Use clear, inclusive language</li>
                        </ul>
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