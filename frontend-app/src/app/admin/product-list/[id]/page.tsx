"use client";
import { ProductInfoRes } from "@/app/lib/type";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import Loading from "@/app/components/Loading";

const AdminEditProductPage = () => {
  const router = useRouter();
  // const pid = params.id;
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const getProductInfo = async (id: string | string[]) => {
    const res = await fetch(`http://localhost:8000/admin/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const productRes = (await res.json()) as ProductInfoRes;
    const product = productRes.data;
    return product;
  };
  const { data, error, isLoading } = useSWR(id ? ["/products", id] : null, () =>
    getProductInfo(id)
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) {
      alert("product id not found");
    }
    // Handle form submission logic here
    if (!title || !imageUrl || !price || !description) {
      alert("some value not found");
      return;
    }
    const url = `http://localhost:8000/admin/edit-product/${id}`;
    const bodyInfo = {
      title: title,
      imageUrl: imageUrl,
      price: parseFloat(price),
      description: description,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyInfo),
    })
      .then((response) => response.json())
      .then((result) => {
        alert("Updated Success!");
        router.push(`/admin/product-list`);
      })
      .catch((error) => {
        console.error(error);
        alert(`Update Product error: ${error}`);
      });
  };

  useEffect(() => {
    if (!data) return;
    setTitle(data.title);
    setImageUrl(data.imageUrl);
    setDescription(data.description);
    setPrice(data.price.toString());
    return () => {
      setTitle("");
      setImageUrl("");
      setDescription("");
      setPrice("");
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100%-56px)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full h-[calc(100%-56px)] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-4 bg-white rounded shadow-md text-gray-900"
        style={{ width: "32rem" }}
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminEditProductPage;
