import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D',
      caption: 'Fashion Sale',
    },
    {
      image: 'https://www.studiosuits.com/cdn/shop/articles/main-image_86c2e5e3-b905-46d5-990f-5f598c7326c0_1100x.jpg?v=1710233966',
      caption: 'Summer Collection',
    },
    {
      image: 'https://wwd.com/wp-content/uploads/2024/06/best-summer-outfits.jpg',
      caption: 'New Arrivals',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full h-full bg-gray-100 container mx-auto">
     
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-700 ease-in-out transform ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold">{slide.caption}</h1>
            </div>
          </div>
        ))}

        <button
          className="absolute top-1/2 left-5 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full transform -translate-y-1/2"
          onClick={prevSlide}
        >
          Prev
        </button>
        <button
          className="absolute top-1/2 right-5 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full transform -translate-y-1/2"
          onClick={nextSlide}
        >
          Next
        </button>
      </div>

     
      <div className="py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold">About Us</h2>
        <p className="mt-4 text-lg text-gray-600">
          We are a leading brand offering amazing products with a mission to serve our customers.
        </p>
        <div className=' mt-6'>
        <Link className="mt-6 bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700" to={'/products'}>
          Check our products
        </Link>
        </div>
      </div>
      
      

      <div className="py-16 bg-indigo-600 text-center text-white">
        <h2 className="text-3xl font-semibold">Join Us Today!</h2>
        <p className="mt-4 text-lg">
          Become part of our growing community and get access to exclusive deals and content.
        </p>
        <br />
        <Link className="mt-6 bg-white text-indigo-600 py-2 px-6 rounded-full hover:bg-gray-200" to={'/signup'}>
          Sign Up Now
        </Link>
      </div>

     
      <footer className="py-8 bg-gray-800 text-center text-white">
        <p>&copy; 2024 Antiguo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
