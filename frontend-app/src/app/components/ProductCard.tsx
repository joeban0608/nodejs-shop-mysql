"use client";
import React from "react";
import type { ProductInfo } from "../lib/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { mutate } from "swr";

const ProductCard = ({
  id,
  title,
  price,
  imageUrl,
  description,
  page,
  user,
}: ProductInfo & { page: string }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">${price.toFixed(2)}</p>
      <p className="text-gray-700 mt-4 truncate">{description}</p>
      {user?.email && (
        <p className="mt-4 text-gray-700">
          <span className="text-gray-600 font-bold">Owner:</span>{" "}
          <span className="italic text-gray-500">{user.email}</span>
        </p>
      )}
      {page === "admin" ? <AdminButtons id={id} /> : <ShopButtons id={id} />}
    </div>
  </div>
);

export default ProductCard;

const ShopButtons = ({ id }: { id: string }) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCard = async () => {
    try {
      const res = await fetch(`http://localhost:8000/cart/${id}`, {
        method: "POST",
        credentials: "include",
      });
      if (!user) {
        await alert("please Sign up or login first!");
        await router.push("/login");
        return;
      }
      if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes.error);
      }
      const addToCardRes = await res.json();
      if (addToCardRes.message) {
        alert(addToCardRes.message);
        router.push("/cart");
        return;
      }
      if (addToCardRes.error) {
        throw new Error(addToCardRes.error);
      }
      return;
    } catch (err) {
      console.error(err);
      alert(`Failed to add to card: ${err}`);
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
  const { user } = useAuth();
  const handleDelete = async () => {
    fetch(`http://localhost:8000/admin/delete-product/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then(async (result) => {
        alert(`${result?.message ?? "Success to delete Product!"}`);
        await mutate(["api/products", user]);
      })
      .catch((error) => {
        alert(`Error to delete Product: ${JSON.stringify(error.message)}`);
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
