import React from "react";
import { ProductsRes } from "../../lib/type";
import ProductCard from "../../components/ProductCard";

const AdminProductListPage = async () => {
  const url = "http://localhost:8000/products";
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });
  const productsRes = (await res.json()) as ProductsRes;
  const products = productsRes.data;
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
