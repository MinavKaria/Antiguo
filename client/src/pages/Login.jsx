// src/components/Login.js
import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full scale-75">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Antiguo</h1>
          <p className="text-gray-500">Login to your account</p>
        </div>

        {/* Login Form */}
        <form>
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember_me"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Login Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
            <span className="sr-only">Sign in with Google</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.35 11.1h-8.59v3.51h5.01c-.25 1.38-1.43 4.05-5.01 4.05-3.03 0-5.51-2.51-5.51-5.51s2.48-5.51 5.51-5.51c1.56 0 2.81.58 3.71 1.51l2.59-2.52C16.63 3.42 14.45 2.5 11.35 2.5 5.58 2.5 1 7.09 1 12.85s4.58 10.35 10.35 10.35c6.37 0 9.86-4.47 9.86-8.68 0-.65-.09-1.27-.21-1.87z" />
            </svg>
          </button>
          <button className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
            <span className="sr-only">Sign in with Facebook</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.25 8.28v-1.7c0-.7.47-.87.8-.87h1.51V3.12H13.5c-2.07 0-2.79 1.35-2.79 2.79v2.37h-1.39v3.21h1.39v8.53h3.31v-8.53h2.21l.32-3.21h-2.53z" />
            </svg>
          </button>
        </div>

        {/* Signup Link */}
        <p className="mt-6 text-center text-gray-500">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
