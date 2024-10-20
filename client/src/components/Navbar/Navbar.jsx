import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../provider/Context";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogin(true);
      console.log("User logged in");
      console.log(userDetails);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLogin(false);
      setUserDetails({});
      localStorage.removeItem("user");
      console.log("User signed out");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const { isLogin, setIsLogin, userDetails, setUserDetails } =
    useGlobalContext();

  return (
    <nav className="bg-[#121213] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="hidden lg:flex flex-1 justify-around items-center">
          <Link className="focus:outline-none" to="/products">
            <span className="text-sm tracking-[20px]">MENU</span>
          </Link>
          <Link className="focus:outline-none" to="/search">
            <span className="text-sm tracking-[20px]">SEARCH</span>
          </Link>
        </div>

        <Link
          className="text-2xl font-bold tracking-wide flex-1 text-center"
          to="/"
        >
          ANTIGUO
        </Link>

        <div className="hidden md:flex flex-1 justify-around items-center">
          {!isLogin ? (
            <Link
              to="/login"
              className="text-sm tracking-[20px] focus:outline-none"
            >
              LOG IN
            </Link>
          ) : (
            <button
              className="focus:outline-none flex items-center"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          <div className="flex gap-5 items-center">
            <Link className="flex" to="/profile">
              {!isLogin  ? (
                <img
                  src={"https://freesvg.org/img/abstract-user-flat-4.png"}
                  alt="User Avatar"
                  className="rounded-full w-10"
                />
              ) : (
                <>
                  <img
                    src={`${userDetails.photoURL || 'https://freesvg.org/img/abstract-user-flat-4.png'}`}
                    alt="User Avatar"
                    className=" rounded-full w-10"
                    loading="lazy"
                  />
                </>
              )}
            </Link>

            <Link to="/cart" className="flex">
              <img src="/cart.svg" alt="Cart Icon" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
