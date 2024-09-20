"use client";
import React from "react";
import { getOrders } from "../lib/api";
import useSWR from "swr";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const OrderPage = () => {
  const { user } = useAuth();
  const {
    data: orders,
    error,
    isLoading,
    // mutate,
  } = useSWR(user ? ["api/orders", user] : null, getOrders);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100%-56px)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  if (!orders?.length) {
    return <h3 className="text-3xl font-bold">Orders is Empty.</h3>;
  }

  return (
    <>
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4 mb-4 shadow-md">
          <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
          <ul>
            {order.products.map((product) => {
              const quantity = product?.orderItem?.quantity ?? 0;
              const totalProductPrice = product.price * quantity;
              return (
                <li
                  key={product.id}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-sm">Price: ${product.price}</p>
                    <p className="text-sm">Quantity: {quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm">Total: ${totalProductPrice}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border-t mt-2 pt-2">
            <p className="font-bold">
              Order Total: $
              {order.products.reduce((sum, product) => {
                const quantity = product?.orderItem?.quantity ?? 0;
                return sum + product.price * quantity;
              }, 0)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderPage;
