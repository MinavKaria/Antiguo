import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import dummyData from './../data/DummyData';
import axios from 'axios';
import ProductCard from "../components/ProductCard";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };

    scrollToTop();

    const fetchData = async () => {
      await fetchProducts();
    };

    setTimeout(() => {
      fetchData();
    }, 500); 
  }, []);


  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-10 flex flex-col lg:flex-row p-5 gap-10">
      
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="text-center">
                      <Skeleton height={600} className="mb-4" />
                      <Skeleton width={150} className="mb-2" />
                      <Skeleton width={80} />
                    </div>
                  ))
              : products.map((product, index) => (
                  <>
                    <ProductCard key={index} product={product} />
                  </>
                ))}
          </div>
        </div>
        <div className="w-full lg:w-1/5 pr-6 mb-8 lg:mb-0">
          <div className="space-y-8">
            <div>
              <h2 className="font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:underline">
                    Woman
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:underline">
                    Man
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:underline">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Size</h3>
                  <div className="space-y-2">
                    <label className="block text-gray-600">S</label>
                    <label className="block text-gray-600">M</label>
                    <label className="block text-gray-600">L</label>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Color</h3>
                  <select className="block w-full border-gray-300 rounded-lg">
                    <option>Any</option>
                    <option>Red</option>
                    <option>Blue</option>
                    <option>Black</option>
                  </select>
                </div>
                <div>
                  <h3 className="font-semibold">Price</h3>
                  <input type="range" className="w-full" />
                </div>
                <div>
                  <button className="text-gray-600 underline">Reset All</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
