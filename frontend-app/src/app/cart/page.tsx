"use client";
import React, { useEffect } from "react";
import { getCart } from "../lib/api";
import useSWR from "swr";
import Loading from "../components/Loading";

const CartPage = () => {
  const { data: cartData, error, isLoading } = useSWR("api/cart", getCart);
  useEffect(() => {
    // console.log("cartData", cartData);
  }, [cartData]);
  const handleDelete = (id: string) => {
    console.log(`Delete item with id: ${id}`);
    // Here you can add your logic to delete the item
  };
  if (isLoading) {
    return (
      <div className="w-full h-[calc(100%-56px)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  if (!cartData?.length) {
    return <h3 className="text-3xl font-bold">Cart is Empty.</h3>;
  }
  return (
    <ul className="list-none p-0">
      {cartData.map((product) => (
        <li
          key={product.id}
          className="flex justify-between items-center p-4 border-b border-gray-200"
        >
          <h3 className="font-bold text-2xl">{product.title}</h3>
          <p className="text-2xl text-gray-500">
            Quantity: {product?.cartItem?.quantity ?? 0}
          </p>

          <button
            onClick={() => handleDelete(product.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CartPage;
