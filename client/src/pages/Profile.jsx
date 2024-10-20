import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/Context";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const { userDetails, isLogin } = useGlobalContext();
  const [wallet, setWallet] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          setUserData(user);
        } else {
          navigate("/login");
        }
        try {
          const response = await axios.get(
            `http://localhost:3000/api/wallet/${userDetails._id}`
          );
          console.log(response.data);
          setWallet(response.data);
        } catch (err) {
          console.error(err);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWallet();
  }, []);

  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center">
            {userData.username ? (
              <span className="text-4xl font-bold text-gray-700 uppercase">
                {userData.username.charAt(0)}
              </span>
            ) : (
              <Skeleton circle={true} height={96} width={96} />
            )}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {userData.username ? (
              userData.username
            ) : (
              <Skeleton count={1} width={`60%`} />
            )}
          </h1>
          <p className="text-gray-600 mb-4">
            {userData.email ? userData.email : <Skeleton count={1} />}
          </p>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <p className="text-sm text-gray-500">
            Joined on:{" "}
            <span className="font-medium">
              {formatDate(userData.createdAt)}
            </span>
          </p>
          <p
            className={`mt-2 ${
              userData.isAdmin ? "text-green-600" : "text-gray-600"
            }`}
          >
            Role: {userData.isAdmin ? "Admin" : "User"}
          </p>
          <p className="mt-2">
            Wallet:{" "}
            <span className="font-medium">
              ₹ {wallet >= 0 ? wallet : <Skeleton width={40} />}
            </span>
          </p>
        </div>

        <div className="mt-4">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-2">
            <Link to={"/orders"}>Check Your Orders</Link>
          </button>
          <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 mb-2">
            <Link to={"/rented"}>Check Your Rented Orders</Link>
          </button>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
            <Link to={'/addtowallet'}>
            Add Money to Wallet
            </Link>
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
