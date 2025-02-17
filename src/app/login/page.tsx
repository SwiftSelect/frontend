import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div id="auth-container" className="w-full max-w-4xl bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
                <div id="auth-left" className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-purple-900/50 to-gray-900">
                <a href="#" className="text-2xl font-bold text-purple-500 mb-8 inline-flex items-center">
                    <i className="fa-solid fa-brain mr-2"></i>
                    SwiftSelect
                </a>
                <h2 className="text-3xl font-bold mb-4">Welcome</h2>
                <p className="text-gray-400 mb-8">Join our AI-powered platform to find your dream job and connect with top companies.</p>
                <div className="space-y-4 mb-8">
                    <div className="flex items-center text-gray-400">
                    <i className="fa-solid fa-check text-purple-500 mr-3"></i>
                    <span>Smart job matching algorithm</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                    <i className="fa-solid fa-check text-purple-500 mr-3"></i>
                    <span>One-click job applications</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                    <i className="fa-solid fa-check text-purple-500 mr-3"></i>
                    <span>Real-time application tracking</span>
                    </div>
                </div>
                <Image className="rounded-lg" width={300} height={200} src={'/login.svg'} alt="professional person using laptop in modern office, dark theme, purple lighting" />
                </div>
                <div id="auth-right" className="md:w-1/2 p-8 md:p-12">
                <div id="auth-tabs" className="flex mb-8">
                    <button className="flex-1 py-2 text-center text-purple-500 border-b-2 border-purple-500">Sign In</button>
                    <button className="flex-1 py-2 text-center text-gray-400 border-b-2 border-gray-700">Sign Up</button>
                </div>
                <div id="signin-form" className="space-y-6">
                    <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your email" />
                    </div>
                    <div>
                    <label className="block text-gray-400 mb-2">Password</label>
                    <input type="password" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your password" />
                    </div>
                    <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 bg-gray-700 rounded focus:ring-purple-500" />
                        <span className="ml-2 text-gray-400">Remember me</span>
                    </label>
                    <span  className="text-purple-500 hover:text-purple-400 cursor-pointer">Forgot password?</span>
                    </div>
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg">Sign In</button>
                    <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                    </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                    <button className="flex items-center justify-center py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                        <i className="fa-brands fa-google text-xl"></i>
                    </button>
                    <button className="flex items-center justify-center py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                        <i className="fa-brands fa-linkedin text-xl"></i>
                    </button>
                    <button className="flex items-center justify-center py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                        <i className="fa-brands fa-github text-xl"></i>
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
      </div>
    )
}