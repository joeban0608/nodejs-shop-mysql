"use client";
import React from "react";
import type { ProductInfo } from "../lib/type";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductCard = ({
  id,
  title,
  price,
  imageUrl,
  description,
  page,
}: ProductInfo & { page: string }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">${price.toFixed(2)}</p>
      <p className="text-gray-700 mt-4 truncate">{description}</p>
      {page === "admin" ? <AdminButtons id={id} /> : <ShopButtons id={id} />}
    </div>
  </div>
);

export default ProductCard;

const ShopButtons = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleAddToCard = async () => {
    try {
      const requestOptions = {
        method: "POST",
      };

      const res = await fetch(
        `http://localhost:8000/cart/${id}`,
        requestOptions
      );
      if (!res.ok) {
        throw new Error("Fail to add to card.");
      }
      const addToCardRes = await res.json();
      if (addToCardRes.error) {
        throw new Error("Fail to add to card.");
      }
      alert("Add to card Success");
      router.push("/cart");
      // console.log("addToCardRes", addToCardRes);
    } catch (err) {
      alert(`Failed to add to card: ${err}`);
      console.log("add to card err", err);
    }
  };
  return (
    <div className="flex justify-between gap-4 mt-4">
      <Link
        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        href={`/product-list/${id}`}
      >
        Detail
      </Link>
      <button
        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleAddToCard}
      >
        Add to Cart
      </button>
    </div>
  );
};

const AdminButtons = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const requestOptions = {
      method: "DELETE",
    };

    fetch(`http://localhost:8000/products/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        alert(`${result?.message ?? "Success to delete Product!"}`);
        router.refresh();
      })
      .catch((error) => {
        alert(`error to delete: ${JSON.stringify(error.message)}`);
        console.error(error);
      });
  };
  return (
    <div className="flex justify-between gap-4 mt-4">
      <Link
        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        href={`/admin/product-list/${id}`}
      >
        Edit
      </Link>
      <button
        type="button"
        className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
