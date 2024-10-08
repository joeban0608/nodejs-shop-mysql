"use client";
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import { getPrducts, getPrductsRes } from "../lib/api";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

const ShopPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) ?? 1
  );
  const {
    data: productsRes,
    error,
    isLoading,
  } = useSWR(["api/products", currentPage], () => getPrductsRes(currentPage));
  const products = productsRes?.data ?? [];
  const paginationInfo = productsRes?.pagination ?? null;

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
      {paginationInfo && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(
            paginationInfo.total / paginationInfo.page_size
          )}
          onPageChange={handlePageChange}
          routerUrl="shop"
        />
      )}
    </>
  );
};

export default ShopPage;
