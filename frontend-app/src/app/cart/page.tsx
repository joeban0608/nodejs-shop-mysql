"use client";
import React from "react";
import { getCart } from "../lib/api";
import useSWR from "swr";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const CartPage = () => {
  const { user } = useAuth();
  const {
    data: cartData,
    error,
    isLoading,
    mutate,
  } = useSWR(user ? ["api/cart", user] : null, getCart);

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:8000/cart/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result?.error) {
          throw new Error(result.error);
        }
        alert(`${result?.message ?? "Success to delete CartItem!"}`);
      })
      .catch((err) => {
        console.error(err);
        alert(`Error to delete cartItem: ${JSON.stringify(err.message)}`);
      });

    await mutate();
  };

  const handleOrderCart = async () => {
    try {
      const res = await fetch("http://localhost:8000/order", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Create order fetch error");
      }
      const createOrderRes = await res.json();
      if (createOrderRes?.error) {
        throw new Error(createOrderRes.error);
      }
      await alert("Success to create order!");
      await mutate();
    } catch (err) {
      console.error(err);
      alert(`Create order error: ${err}`);
    }
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
    <div className="flex flex-col">
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
      <div className="w-full flex justify-center p-8">
        <button
          onClick={handleOrderCart}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default CartPage;
