import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, index }) {
  return (
    <>
      <Link key={index} className="text-center" to={"/products/" + product._id}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover aspect-w-2 aspect-h-2 mb-4 w-full h-96 sm:w-80 sm:h-[500px] lg:w-[400px] lg:h-[600px]"
        />

        <h3 className="text-sm font-medium">{product.name.toUpperCase()}</h3>
        <p className="text-gray-600">₹{product.price}</p>
      </Link>
    </>
  );
}

export default ProductCard;
