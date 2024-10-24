import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SimilarItem({isLoading, category, currentItem}) {

  const [similarProducts, setSimilarProducts] = useState([]);

  const getSimilarProducts = async () => {
    try {
      const response = await axios.get(`https://mern-project-antiguo.vercel.app/api/product/category/${category}`);
      const products = response.data;
      setSimilarProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSimilarProducts();
    }
    fetchData();
  }, [category]);

  return (
    <>
        <div className="mt-12 ">
        <h2 className="text-xl font-bold mb-4">Similar Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
           {similarProducts.filter((product)=>{
              return product._id !== currentItem
           }).map((product)=>(
            <>
              <Link to={`/product/${product._id}`}>
              <ProductCard product={product} key={product._id} />
              </Link>
            </>
           ))}
             
        </div>
      </div>
    </>
  )
}

export default SimilarItem