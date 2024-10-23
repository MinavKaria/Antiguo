// src/components/Login.js
import React, { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { auth, googleProvider } from '../configs/firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/Context";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import ReactLoading from "react-loading";

const notify = () => toast.success("Successfully logged in!");
const notify2 = () => toast.error("Something went wrong!");

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { isLogin, setIsLogin, setUserDetails } = useGlobalContext();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setIsLogin(true);
      setUserDetails(user);
      localStorage.setItem('user', JSON.stringify(user));
      console.log("Google sign-in success:", user);
    } catch (error) {
      console.error("Google sign-in error:", error);
      notify2();
    } finally {
      notify();
      setTimeout(() => {
        navigate("/");
        setLoading(false);
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
     
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      setIsLogin(true);
      setUserDetails(user);
      localStorage.setItem('user', JSON.stringify(user));
      console.log("User signed in with email:", user);

      notify();
      setTimeout(() => {
        navigate("/");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error signing in:", error);
      setLoading(false);
      notify2();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
        <div className={`${loading ? 'blur-sm' : ''} bg-white p-8 rounded-lg shadow-lg max-w-md w-full scale-75`}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Antiguo</h1>
            <p className="text-gray-500">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
              onClick={handleGoogleSignIn}
            >
              <span className="sr-only">Sign in with Google</span>
              <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" alt="" className="w-5" />
            </button>
          </div>

          <p className="mt-6 text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="ml-40 w-52 h-52">
            <ReactLoading
              type={"spinningBubbles"}
              color={"black"}
              height={"20%"}
              width={"20%"}
            />
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default Login;
