import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // optional loader

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadedData = () => {
    setLoading(false);
  };

  return (
    <div className="landing-page relative min-h-[90vh] "> 
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <ClipLoader color="#36d7b7" loading={loading} size={50} />
        </div>
      )}
      <div className="relative w-full aspect-w-16 aspect-h-9 overflow-hidden">
        <video
          className={`w-full h-[90.8vh] object-cover ${loading ? 'hidden' : ''}`}
          onLoadedData={handleLoadedData}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/intro.mp4?alt=media&token=eba406f3-7d2f-489c-b2a3-e63073dabd72" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div>
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
          <Link to="/products" className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button className="bg-[#000000] text-white py-2 px-4 rounded-full text-lg font-semibold">Explore</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
