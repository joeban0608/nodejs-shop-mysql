"use client";
import React from "react";
import { getOrders } from "../lib/api";
import useSWR from "swr";
import Loading from "../components/Loading";
import Link from "next/link";
import { Icon } from "@iconify/react";

const OrderInvoicePage = () => {
  const {
    data: orders,
    error,
    isLoading,
    // mutate,
  } = useSWR(["api/orders"], getOrders);

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
  console.log("orders", orders);
  return (
    <div className="p-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between border rounded-lg p-4 mb-4 shadow-md"
        >
          <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
          <Link
            href={`http://localhost:8000/orders/${order.id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300 ease-in-out gap-2"
          >
            <div className="w-6 h-6 text-red-500">
              <Icon
                icon="material-symbols:download"
                className="w-full h-full"
              />
            </div>
            Download Invoice
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OrderInvoicePage;
