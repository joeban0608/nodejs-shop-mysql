"use client";
import React from "react";
import ProductCard from "../components/ProductCard";
import { getPrducts } from "../lib/api";
import useSWR from "swr";
import Loading from "../components/Loading";

const ProdcutListPage = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR("api/products", getPrducts);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100%-56px)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  if (!products?.length) {
    return <h3 className="text-3xl font-bold">Prouduct is Empty.</h3>;
  }
  return (
    <main className="w-full h-[calc(100%-56px)] mx-auto px-4 py-8 overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => {
          return (
            <ProductCard key={product.id} {...product} page="product-list" />
          );
        })}
      </div>
    </main>
  );
};

export default ProdcutListPage;
