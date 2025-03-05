"use client";

import useLogin from "./useLogin";
import cx from "classnames";

const LoginForm = () => {
  const { view, setView, signinFormik, signupFormik } = useLogin();

  return (
	<div id="auth-right" className="md:w-1/2 p-8 md:p-12 md:h-full">
	  <div id="auth-tabs" className="flex mb-8">
		<button
		  onClick={() => setView("signin")}
		  className={cx(
			"flex-1 py-2 text-center text-gray-400 border-b-2 border-gray-700",
			{ "text-purple-500 border-purple-500": view === "signin" }
		  )}
		>
		  Sign In
		</button>
		<button
		  onClick={() => setView("signup")}
		  className={cx(
			"flex-1 py-2 text-center text-gray-400 border-b-2 border-gray-700",
			{ "text-purple-500 border-purple-500": view === "signup" }
		  )}
		>
		  Sign Up
		</button>
	  </div>
	  <div id="signin-form" className="space-y-4">
		{view === "signin" ? (
		  <form onSubmit={signinFormik.handleSubmit} className="space-y-4">
			<div>
			  <label className="block text-gray-400 mb-2">Email</label>
			  <input
				name="email"
				type="email"
				onChange={signinFormik.handleChange}
				onBlur={signinFormik.handleBlur}
				value={signinFormik.values.email}
				className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
				placeholder="Enter your email"
			  />
				<div className="text-red-500 text-sm mt-1 min-h-5 text-right">
					{signinFormik.touched.email && signinFormik.errors.email && signinFormik.errors.email}
				</div>
			</div>

			<div>
				<label className="block text-gray-400 mb-2">Password</label>
				<input
					name="password"
					type="password"
					onChange={signinFormik.handleChange}
					onBlur={signinFormik.handleBlur}
					value={signinFormik.values.password}
					className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
					placeholder="Enter your password"
				/>
			  	<div className="text-red-500 text-sm mt-1 min-h-5 text-right">
					{signinFormik.touched.password && signinFormik.errors.password && signinFormik.errors.password}
				</div>
			</div>

			<div className="flex items-center justify-between">
			  <label className="flex items-center">
				<input
				  type="checkbox"
				  name="rememberMe"
				  onChange={signinFormik.handleChange}
				  onBlur={signinFormik.handleBlur}
				  checked={signinFormik.values.rememberMe}
				  className="w-4 h-4 bg-gray-700 rounded focus:ring-purple-500"
				/>
				<span className="ml-2 text-gray-400">Remember me</span>
			  </label>
			  <span className="text-purple-500 hover:text-purple-400 cursor-pointer">
				Forgot password?
			  </span>
			</div>

			<button
				disabled={signinFormik.isSubmitting || !signinFormik.isValid || !signinFormik.dirty}
			  type="submit"
			  className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
			>
			  Sign In
			</button>
		  </form>
		) : (
		  <form onSubmit={signupFormik.handleSubmit} className="space-y-4">
			<div className="flex flex-row gap-4">
				<div>
					<label className="block text-gray-400 mb-2">First Name</label>
					<input
					name="firstName"
					type="text"
					onChange={signupFormik.handleChange}
					onBlur={signupFormik.handleBlur}
					value={signupFormik.values.firstName}
					className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
					placeholder="Enter your first name"
					/>
					<div className="text-red-500 text-sm mt-1 min-h-5 text-right">
						{signupFormik.touched.firstName && signupFormik.errors.firstName && signupFormik.errors.firstName}
					</div>
				</div>
				<div>
					<label className="block text-gray-400 mb-2">Last Name</label>
					<input
						name="lastName"
						type="text"
						onChange={signupFormik.handleChange}
						onBlur={signupFormik.handleBlur}
						value={signupFormik.values.lastName}
						className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
						placeholder="Enter your last name"
					/>
					<div className="text-red-500 text-sm mt-1 min-h-5 text-right">
						{signupFormik.touched.lastName && signupFormik.errors.lastName && signupFormik.errors.lastName}
					</div>
				</div>
			</div>
			<div>
			  <label className="block text-gray-400 mb-2">Email</label>
			  <input
				name="email"
				type="email"
				onChange={signupFormik.handleChange}
				onBlur={signupFormik.handleBlur}
				value={signupFormik.values.email}
				className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
				placeholder="Enter your email"
			  />
			  <div className="text-red-500 text-sm mt-1 min-h-5 text-right">
				{signupFormik.touched.email && signupFormik.errors.email && signupFormik.errors.email}
			  </div>
			</div>

			<div>
			  <label className="block text-gray-400 mb-2">Password</label>
			  <input
				name="password"
				type="password"
				onChange={signupFormik.handleChange}
				onBlur={signupFormik.handleBlur}
				value={signupFormik.values.password}
				className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
				placeholder="Enter your password"
			  />
			  <div className="text-red-500 text-sm mt-1 min-h-5 text-right">
				{signupFormik.touched.password && signupFormik.errors.password && signupFormik.errors.password}
			  </div>
			</div>

			<div>
			  <label className="block text-gray-400 mb-2">
				Confirm Password
			  </label>
			  <input
				name="confirmPassword"
				type="password"
				onChange={signupFormik.handleChange}
				onBlur={signupFormik.handleBlur}
				value={signupFormik.values.confirmPassword}
				className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
				placeholder="Confirm your password"
			  />
			  <div className="text-red-500 text-sm mt-1 min-h-5 text-right">
				{signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword && signupFormik.errors.confirmPassword}
			  </div>
			</div>

			<div className="flex items-center justify-between">
			  <label className="flex items-center">
				<input
				  type="checkbox"
				  name="isRecruiter"
				  onChange={signupFormik.handleChange}
				  onBlur={signupFormik.handleBlur}
				  checked={signupFormik.values.isRecruiter}
				  className="w-4 h-4 bg-gray-700 rounded focus:ring-purple-500"
				/>
				<span className="ml-2 text-gray-400">I am a recruiter</span>
			  </label>
			</div>
			<button
				disabled={signupFormik.isSubmitting || !signupFormik.isValid || !signupFormik.dirty}
			  	type="submit"
			  	className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
			>
			  Sign Up
			</button>
		  </form>
		)}

		<div className="relative">
		  <div className="absolute inset-0 flex items-center">
			<div className="w-full border-t border-gray-700"></div>
		  </div>
		  <div className="relative flex justify-center text-sm">
			<span className="px-2 bg-gray-800 text-gray-400">
			  Or continue with
			</span>
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
  );
};

export default LoginForm;
