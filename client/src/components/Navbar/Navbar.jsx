import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsDropdownOpen(windowWidth <= 1060);
  }, [windowWidth]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

    if (isDropdownOpen == true) {
      document.body.classList.toggle('no-scroll');
    }
    else {
      document.body.classList.toggle('no-scroll');
    }

  };

  return (
    <nav className="bg-[#121213] text-white p-4">
      <div className="container mx-auto  justify-between items-center flex">
 
        <div className=" hidden lg:flex flex-1 justify-around items-center">
          <button className="focus:outline-none">
            <span className="text-sm tracking-[20px]">MENU</span>
          </button>
          <button className="focus:outline-none">
            <span className="text-sm tracking-[20px]">SEARCH</span>
          </button>
        </div>


        <div className="text-2xl font-bold tracking-wide flex-1 text-center">ANTIGUO</div>

        <div className="hidden md:flex flex-1 justify-around items-center">
          <button className="focus:outline-none">
            <span className="text-sm tracking-[20px]">SIGN IN</span>
          </button>
          <div className='flex gap-5'>
            <img src="/user.svg" alt="" />
            <img src="/cart.svg" alt="" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
