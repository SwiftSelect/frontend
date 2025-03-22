import Nav from "@/components/nav/nav";
import Image from "next/image";

export default function CandidateProfilePage() {
    return (
        <div className="bg-gray-900 text-gray-100">
            <Nav />
            <main className="pt-24 min-h-screen">
                <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                    <div id="profile-card" className="bg-gray-800 rounded-xl p-6 mb-6">
                        <div className="flex flex-col items-center text-center mb-6">
                        <Image src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" width={30} height={30} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
                        <h2 className="text-2xl font-bold mb-2">John Doe</h2>
                        <p className="text-purple-500 mb-3">Senior Software Engineer</p>
                        <p className="text-gray-400">San Francisco, CA</p>
                        </div>
                        <div className="flex justify-center space-x-4 mb-6">
                        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center">
                            <i className="fa-solid fa-pen-to-square mr-2"></i>
                            Edit Profile
                        </button>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center">
                            <i className="fa-solid fa-share-nodes mr-2"></i>
                            Share
                        </button>
                        </div>
                        <div className="border-t border-gray-700 pt-6">
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-400">Profile Completion</span>
                            <span className="text-purple-500">85%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-purple-500 rounded-full h-2"></div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="lg:col-span-2">
                    <div id="profile-form" className="bg-gray-800 rounded-xl p-6">
                        <div className="mb-8">
                        <h3 className="text-xl font-bold mb-6">Professional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                            <label className="block text-gray-400 mb-2">Full Name</label>
                            <input type="text" value="John Doe" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                            <div>
                            <label className="block text-gray-400 mb-2">Email</label>
                            <input type="email" value="john.doe@example.com" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                            <div>
                            <label className="block text-gray-400 mb-2">Current Position</label>
                            <input type="text" value="Senior Software Engineer" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                            <div>
                            <label className="block text-gray-400 mb-2">Location</label>
                            <input type="text" value="San Francisco, CA" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                        </div>
                        </div>
                        <div className="mb-8">
                        <h3 className="text-xl font-bold mb-6">Resume</h3>
                        <div className="bg-gray-700 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <i className="fa-solid fa-file-pdf text-2xl text-purple-500 mr-3"></i>
                                <span>JohnDoe_Resume.pdf</span>
                            </div>
                            <button className="text-gray-400 hover:text-purple-500">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                            </div>
                            <div className="flex gap-4">
                            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center">
                                <i className="fa-solid fa-upload mr-2"></i>
                                Upload New
                            </button>
                            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg flex items-center">
                                <i className="fa-solid fa-download mr-2"></i>
                                Download
                            </button>
                            </div>
                        </div>
                        </div>
                        <div className="mb-8">
                        <h3 className="text-xl font-bold mb-6">Skills</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-purple-600/20 text-purple-500 rounded-full">JavaScript</span>
                            <span className="px-3 py-1 bg-purple-600/20 text-purple-500 rounded-full">React</span>
                            <span className="px-3 py-1 bg-purple-600/20 text-purple-500 rounded-full">Node.js</span>
                            <span className="px-3 py-1 bg-purple-600/20 text-purple-500 rounded-full">Python</span>
                            <span className="px-3 py-1 bg-purple-600/20 text-purple-500 rounded-full">AWS</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Add a skill" className="flex-1 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
                            <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        </div>
                        <div className="border-t border-gray-700 pt-6">
                        <div className="flex justify-end gap-4">
                            <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">Cancel</button>
                            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">Save Changes</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </main>
        </div>    
    );
};
