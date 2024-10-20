import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

const Context = createContext();

function ContextProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    return savedCart || [];
  });
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [userDetails, setUserDetails] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user || {};
  });
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    console.log("isGoogleLogin", isGoogleLogin);
  }, [isGoogleLogin]);

  useEffect(() => {
    console.log("isLogin", isLogin);
  }, [isLogin]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLogin(true);
      setUserDetails(user);
    } else {
      setIsLogin(false);
      setUserDetails({});
    }
  }, []);

  const addToCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x._id === product._id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist.quantity === 1) {
      setCart(cart.filter((x) => x._id !== product._id));
    } else {
      setCart(
        cart.map((x) =>
          x._id === product._id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const fullyRemoveFromCart = (product) => {
    setCart(cart.filter((x) => x._id !== product._id));
  };

  return (
    <Context.Provider
      value={{
        isLogin,
        setIsLogin,
        userDetails,
        setUserDetails,
        cart,
        setCart,
        isGoogleLogin,
        setIsGoogleLogin,
        addToCart,
        removeFromCart,
        fullyRemoveFromCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGlobalContext must be used within a Context.Provider");
  }
  return context;
};
