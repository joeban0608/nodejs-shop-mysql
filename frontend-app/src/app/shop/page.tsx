"use client";
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import { getPrducts } from "../lib/api";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { useRouter } from "next/navigation";

const ShopPage = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR("api/products", getPrducts);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // 假设有10页

  const handlePageChange = async (pageNumber: number) => {
    await setCurrentPage(pageNumber);
    await router.push(`/shop?page=${pageNumber}`);
  };
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
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => {
          return <ProductCard key={product.id} {...product} page="shop" />;
        })}
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ShopPage;
