"use client";
import React from "react";
import ProductCard from "../../components/ProductCard";
import useSWR from "swr";
import Loading from "@/app/components/Loading";
import { getAdminPrducts } from "@/app/lib/api";
import useAuth from "@/app/hooks/useAuth";

const AdminProductListPage = () => {
  const { user } = useAuth();
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(user ? ["api/products", user] : null, getAdminPrducts);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product) => {
        return <ProductCard key={product.id} {...product} page="admin" />;
      })}
    </div>
  );
};

export default AdminProductListPage;
