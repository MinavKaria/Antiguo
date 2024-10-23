import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CategoryLine from "../components/CategoryLine";

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const addToSelectedCategories = (category) => {
    setSelectedCategories([...selectedCategories, category]);
  };

  const removeFromSelectedCategories = (category) => {
    const newSelectedCategories = selectedCategories.filter(
      (selectedCategory) => selectedCategory !== category
    );
    setSelectedCategories(newSelectedCategories);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      const products = response.data;
      const allCategories = products.map((product) => product.category);
      const uniqueCategories = [...new Set(allCategories)];
      setCategories(uniqueCategories);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (minPrice >= maxPrice) {
      alert("Min Price should be less than Max Price");
      setMaxPrice(100000);
      setMinPrice(0);
    }

    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    setFilteredProducts(filtered);
  }, [selectedCategories, minPrice, maxPrice, products]);

  useEffect(() => {
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
              : filteredProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
          </div>
        </div>

        <div className="w-full lg:w-1/5 pr-6 mb-8 lg:mb-0">
          <div className="space-y-8">
            <div>
              <h2 className="font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                {loading ? (
                  <>
                  <Skeleton height={20} />
                  <Skeleton height={20} />
                  <Skeleton height={20} />

                  </>
                ):(
                  <>
                  {categories.map((category, index) => (
                  <CategoryLine
                    key={index}
                    category={category}
                    categoryChange={[
                      addToSelectedCategories,
                      removeFromSelectedCategories,
                    ]}
                  />
                ))}
                  </>
                )}
               
              </ul>
            </div>

            <div>
              <h2 className="font-bold mb-4">Filter by Price</h2>
              <div className="flex flex-col space-y-4">
               {loading ? <>
                <Skeleton height={40} />
                <Skeleton height={40} />
               </> :<> <div>
                  <label className="block text-gray-700">Min Price:</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="border p-2 w-full"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Max Price:</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="border p-2 w-full"
                    min="0"
                  />
                  
                </div>
                </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
