import type { ProductInfo, ProductInfoRes } from "@/app/lib/type";
import React from "react";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const pid = params.id;
  if (!pid) return <div>product not found</div>;
  const url = `http://localhost:8000/product/${pid}`;
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });
  const productRes = (await res.json()) as ProductInfoRes;
  const product = productRes.data;
  return <ProductInfo {...product} />;
};

export default ProductPage;

const ProductInfo = (product: ProductInfo) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          className="w-full h-64 object-cover object-center"
          src={product.imageUrl}
          alt={product.title}
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-800">
              ${product?.price?.toFixed(2)}
            </span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="bg-gray-100 p-4">
          <p className="text-sm text-gray-600">
            Created at: {new Date(product.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            Updated at: {new Date(product.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
