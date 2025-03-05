import Image from "next/image";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div
        id="auth-container"
        className="w-full max-w-5xl bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
      >
        <div className="flex flex-col md:flex-row">
          <div
            id="auth-left"
            className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-purple-900/50 to-gray-900"
          >
            <a
              href="#"
              className="text-2xl font-bold text-purple-500 mb-8 inline-flex items-center"
            >
              <i className="fa-solid fa-brain mr-2"></i>
              SwiftSelect
            </a>
            <h2 className="text-3xl font-bold mb-4">Welcome</h2>
            <p className="text-gray-400 mb-8">
              Join our AI-powered platform to find your dream job and connect
              with top companies.
            </p>
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
            <Image
              className="rounded-lg"
              width={300}
              height={200}
              src={"/login.svg"}
              priority
              alt="professional person using laptop in modern office, dark theme, purple lighting"
            />
          </div>
            <LoginForm />
        </div>
      </div>
    </div>
  );
}
