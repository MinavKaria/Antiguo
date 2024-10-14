// src/pages/SignupPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/Context";
import { auth, googleProvider, provider } from "../configs/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ReactLoading from "react-loading";

const notify = () => toast.success("Successfully registered!");

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    } else {
      setError("");
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users",
        formData
      );

      console.log(res.data);
     

      notify();
    

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.log(err);
      setError("Failed to register user");
      setLoading(false);

    } finally {
      console.log("Form submitted", formData);
    }
};


  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { isLogin, setIsLogin, setUserDetails } = useGlobalContext();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      console.log(user);
      setIsLogin(true);
      setUserDetails(user);
      const uid = user.uid;
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Google sign-in success:", user);

      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-100">
      <div className={ loading ? `blur-sm`:`` + `relative max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6 scale-75`}>
        <div className="text-center mb-8 ">
          <h1 className="text-4xl font-bold text-gray-800">Antiguo</h1>
          <p className="text-gray-500">Signup to your account</p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <button
            className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
            onClick={() => {
              handleGoogleSignIn();
            }}
          >
            <span className="sr-only">Sign in with Google</span>
            <img
              src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
              alt=""
              className="w-5"
            />
          </button>
        </div>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
      <Toaster />
      {loading && <div className="fixed inset-0 flex justify-center items-center">
        <div className="ml-40 w-52 h-52">
          <ReactLoading
            type={"spinningBubbles"}
            color={"black"}
            height={"20%"}
            width={"20%"}
          />
        </div>
      </div>}
    </div>
  );
};

export default SignupPage;
