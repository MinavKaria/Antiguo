import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import SimilarItem from "../components/SimilarItem";
import { useParams } from "react-router-dom";
import axios from "axios";
import { similarProducts } from "../data/DummyData";
import { useGlobalContext } from "../provider/Context";

const ProductPage = ({ isLoading }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0); 
  const [isForRent, setIsForRent] = useState(false); 

  const { cart, addToCart, removeFromCart } = useGlobalContext();

  // Fetch product details
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://mern-project-antiguo.vercel.app/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkCartForProduct = () => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cartFromLocalStorage.find(item => item._id === id);
    if (productInCart) {
      setQuantity(productInCart.quantity);
      setIsForRent(productInCart.isRented || false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProduct();
      checkCartForProduct(); 
    };
    fetchData();
  }, [id]);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart({ ...product, quantity: newQuantity, isRented: isForRent });
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    addToCart({ ...product, quantity: newQuantity, isRented: isForRent });
  };

  const toggleRentStatus = () => {
    setIsForRent((prevStatus) => !prevStatus);
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      setQuantity(1); 
      addToCart({ ...product, quantity: 1, isRented: isForRent });
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);
  

  return (
    <div className="container mx-auto p-16">
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 w-full md:w-1/2 flex">
          <div className="aspect-w-3 aspect-h-4 relative pr-4">
            {isLoading ? (
              <Skeleton height={600} />
            ) : (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover aspect-w-2 aspect-h-2 mb-4 w-full"
              />
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 px-20 py-6">
          {isLoading ? (
            <Skeleton count={5} />
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-700 text-lg">₹{product.price}</p>
              <p className="text-gray-600 my-4">{product.description}</p>

              <div className="flex items-center mb-4">
                <span className="text-lg font-medium mr-4">
                  {isForRent ? "For Rent" : "For Sale"}
                </span>
                <button
                  onClick={toggleRentStatus}
                  className={`${
                    isForRent ? "bg-green-500" : "bg-gray-200"
                  } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
                >
                  <span
                    className={`${
                      isForRent ? "translate-x-6" : "translate-x-1"
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
                  />
                </button>
              </div>

              {quantity > 0 ? (
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={decreaseQuantity}
                    className="bg-gray-200 text-black px-4 py-2 rounded-md"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="bg-gray-200 text-black px-4 py-2 rounded-md"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="bg-black text-white px-4 py-2 rounded-md"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <SimilarItem isLoading={isLoading} category={product.category} currentItem={product._id} />
    </div>
  );
};

export default ProductPage;
