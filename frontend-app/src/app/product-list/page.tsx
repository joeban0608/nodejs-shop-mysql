import React from "react";
import { ProductsRes } from "../shop/page";
import ProductCard from "../components/ProductCard";

const ProdcutListPage = async () => {
  const url = "http://localhost:8000/products";
  const res = await fetch(url, {
    // cache: "no-store",
    method: "GET",
    next: { revalidate: 0 },
  });
  const productsRes = (await res.json()) as ProductsRes;
  const products = productsRes.products;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => {
          return <ProductCard key={product.title} {...product} />;
        })}
      </div>
    </div>
  );
};

export default ProdcutListPage;
