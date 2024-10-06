import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useGlobalContext } from '../../provider/Context';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const {isLogin,setIsLogin,userDetails,setUserDetails}=useGlobalContext();
  const auth = getAuth();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    const user=JSON.parse(localStorage.getItem('user'));
    if(user){
      setIsLogin(true);
      setUserDetails(user);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsDropdownOpen(windowWidth <= 1060);
  }, [windowWidth]);

 ;

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
         {!isLogin ? (<button className="focus:outline-none">
            <Link to="/signup"  className="text-sm tracking-[20px]">SIGN IN</Link>
          </button>):
          (
            <button className="flex items-center" onClick={()=>{
              signOut(auth).then(() => {
                console.log('User signed out');
              }).catch((error) => {
                console.log(error);
              });
              setIsLogin(false);
              setUserDetails({});
              localStorage.removeItem('user');
            }}>
            Logout
          </button>
          )}
          <div className='flex gap-5'>
          {!isLogin ? (
                <>
                  <div
                    className="flex"
                    onClick={() => {
                      navigate("/sign");
                    }}
                  >
                    <img src="user.svg" alt="" />
                  
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="flex"
                    onClick={() => {
                    
                    }}
                  >
                    <img
                      src={
                        userDetails.photoURL ||
                        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                      }
                      alt=""
                      className=" rounded-full w-10 mr-5"
                    />
                   
                  </div>
                </>
              )}
            <Link to="/cart" className="flex">
              <img src="/cart.svg" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
