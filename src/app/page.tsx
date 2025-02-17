import Link from "next/link"

export default function Home() {
  return (
  <div className="bg-gray-900 text-gray-100">
    <header id="header" className="fixed w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-2xl font-bold text-purple-500">
              <i className="fa-solid fa-brain mr-2"></i>
              SwiftSelect
            </a>
            <nav className="hidden md:flex space-x-6">
              <span  className="text-gray-300 hover:text-purple-500 cursor-pointer">Jobs</span>
              <span  className="text-gray-300 hover:text-purple-500 cursor-pointer">Companies</span>
              <span  className="text-gray-300 hover:text-purple-500 cursor-pointer">For Recruiters</span>
            </nav>
          </div>
          <Link href="/login">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">Login</button>
            </div> 
          </Link>
        </div>
      </div>
    </header>
    <section id="hero" className="pt-24 h-[700px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream Job with
            <span className="text-purple-500"> AI-Powered </span>
            Matching
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl">
            Our advanced AI technology matches your skills and experience with the perfect job opportunities, making your job search smarter and more efficient.
          </p>
          <h1 className="text-purple-500 text-5xl md:text-6xl font-bold m-6">Coming soon!</h1>

          {/* <div className="w-full max-w-3xl bg-gray-800 p-4 rounded-2xl mb-12">
            <div className="flex gap-4">
              <div className="flex-1">
                <input type="text" placeholder="Job title, skills, or company" className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center">
                <i className="fa-solid fa-search mr-2"></i>
                Search
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
    <section id="featured-jobs" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Job Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div id="job-card-1" className="bg-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fa-brands fa-google text-2xl text-purple-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold">Senior Software Engineer</h3>
                  <p className="text-gray-400">Google</p>
                </div>
              </div>
              <button className="text-purple-500">
                <i className="fa-regular fa-bookmark"></i>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Remote</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Full-time</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">$120k-$180k</span>
            </div>
            <p className="text-gray-400 mb-4">Join our team to build next-generation cloud infrastructure and help shape the future of technology.</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Posted 2 days ago</span>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">Apply Now</button>
            </div>
          </div>
          <div id="job-card-2" className="bg-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fa-brands fa-facebook text-2xl text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold">Product Designer</h3>
                  <p className="text-gray-400">Meta</p>
                </div>
              </div>
              <button className="text-purple-500">
                <i className="fa-regular fa-bookmark"></i>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Hybrid</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Full-time</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">$90k-$140k</span>
            </div>
            <p className="text-gray-400 mb-4">Design beautiful and intuitive interfaces for our social media platforms and apps.</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Posted 3 days ago</span>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">Apply Now</button>
            </div>
          </div>
          <div id="job-card-3" className="bg-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fa-brands fa-spotify text-2xl text-green-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold">Data Scientist</h3>
                  <p className="text-gray-400">Spotify</p>
                </div>
              </div>
              <button className="text-purple-500">
                <i className="fa-regular fa-bookmark"></i>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Remote</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Full-time</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">$100k-$160k</span>
            </div>
            <p className="text-gray-400 mb-4">Work with big data to improve music recommendations and user experience.</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Posted 5 days ago</span>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose TalentAI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div id="feature-1" className="text-center p-6">
            <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-robot text-3xl text-purple-500"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">AI-Powered Matching</h3>
            <p className="text-gray-400">Our advanced algorithms match your profile with the most relevant job opportunities.</p>
          </div>
          <div id="feature-2" className="text-center p-6">
            <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-bolt text-3xl text-purple-500"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Applications</h3>
            <p className="text-gray-400">Apply to multiple jobs with one click using your smart profile.</p>
          </div>
          <div id="feature-3" className="text-center p-6">
            <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-chart-line text-3xl text-purple-500"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Real-time Analytics</h3>
            <p className="text-gray-400">Track your application status and get insights on your job search progress.</p>
          </div>
        </div>
      </div>
    </section>
    <section id="cta" className="py-20 bg-gradient-to-br from-purple-900/50 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Next Opportunity?</h2>
          <p className="text-xl text-gray-400 mb-8">Join thousands of professionals who have already found their dream jobs through TalentAI.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg">
              <i className="fa-solid fa-user-plus mr-2"></i>
              Sign Up as Job Seeker
            </button>
            <button className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
              <i className="fa-solid fa-building mr-2"></i>
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </section>
    <footer id="footer" className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <a href="#" className="text-2xl font-bold text-purple-500 mb-6 inline-block">
              <i className="fa-solid fa-brain mr-2"></i>
              SwiftSelect
            </a>
            <p className="text-gray-400">AI-powered recruitment platform connecting talent with opportunities.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li><span  className="text-gray-400 hover:text-purple-500 cursor-pointer">Browse Jobs</span></li>
              <li><span  className="text-gray-400 hover:text-purple-500 cursor-pointer">Companies</span></li>
              <li><span  className="text-gray-400 hover:text-purple-500 cursor-pointer">Career Resources</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li><span  className="text-gray-400 hover:text-purple-500 cursor-pointer">Post a Job</span></li>
              <li><span  className="text-gray-400 hover:text-purple-500 cursor-pointer">Talent Search</span></li>
              <li><span  className="text-gray-400 hover:text-purple-500 cursor-pointer">Pricing</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-500">
                <i className="fa-brands fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500">
                <i className="fa-brands fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500">
                <i className="fa-brands fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 SwiftSelect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>  
  );
}
