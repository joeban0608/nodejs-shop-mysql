"use client";
import React from "react";
import ProductCard from "../../components/ProductCard";
import useSWR from "swr";
import Loading from "@/app/components/Loading";
import { getPrducts } from "@/app/lib/api";

const AdminProductListPage = () => {
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
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => {
          return <ProductCard key={product.title} {...product} page="admin" />;
        })}
      </div>
    </div>
  );
};

export default AdminProductListPage;
