import React from "react";

const ProductCard = ({ title, price, imageUrl, description }: ProductInfo) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">${price.toFixed(2)}</p>
      <p className="text-gray-700 mt-4">{description}</p>
    </div>
  </div>
);

export default ProductCard;
