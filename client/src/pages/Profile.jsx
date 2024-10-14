import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming you're using axios to fetch the data

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    createdAt: '',
    isAdmin: false
  });
  const [id,setId]=useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      
      window.location.href = '/login';
    }
    else
    {
      setId(user._id);
    }
  }, []);

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`); // Adjust the endpoint as needed
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    
    fetchUserData();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-700 uppercase">
              {userData.username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">{userData.username}</h1>
          <p className="text-gray-600 mb-4">{userData.email}</p>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <p className="text-sm text-gray-500">
            Joined on: <span className="font-medium">{new Date(userData.createdAt).toLocaleDateString()}</span>
          </p>
          <p className={`mt-2 ${userData.isAdmin ? 'text-green-600' : 'text-gray-600'}`}>
            Role: {userData.isAdmin ? 'Admin' : 'User'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
