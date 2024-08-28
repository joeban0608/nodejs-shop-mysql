"use client";
import React from "react";
import { getCart } from "../lib/api";
import useSWR from "swr";
import Loading from "../components/Loading";

const CartPage = () => {
  const {
    data: cartData,
    error,
    isLoading,
    mutate,
  } = useSWR("api/cart", getCart);

  const handleDelete = async (id: string) => {
    const requestOptions = {
      method: "DELETE",
    };

    await fetch(`http://localhost:8000/cart/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.error) {
          throw new Error(result.error);
        }
        alert(`${result?.message ?? "Success to delete CartItem!"}`);
      })
      .catch((error) => {
        alert(`Error to delete cartItem: ${JSON.stringify(error.message)}`);
        console.error(error);
      });

    await mutate();
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
