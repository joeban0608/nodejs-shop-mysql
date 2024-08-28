"use client";
import React, { useEffect } from "react";
import { getCart } from "../lib/api";
import useSWR from "swr";

const CartPage = () => {
  const { data: cartData, error, isLoading } = useSWR("api/cart", getCart);

  useEffect(() => {
    console.log("cartData", cartData);
  }, [cartData]);
  return <div>cart page</div>;
};

export default CartPage;
