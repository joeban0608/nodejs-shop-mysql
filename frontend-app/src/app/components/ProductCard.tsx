import React from "react";
import type { ProductInfo } from "../lib/type";
import Link from "next/link";

const ProductCard = ({
  id,
  title,
  price,
  imageUrl,
  description,
}: ProductInfo) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">${price.toFixed(2)}</p>
      <p className="text-gray-700 mt-4">{description}</p>
      <div className="flex justify-between gap-4 mt-4">
        <Link
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          href={`/product-list/${id}`}
        >
          <button className="w-full">detail</button>
        </Link>
        <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
