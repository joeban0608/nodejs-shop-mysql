"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const AddProductPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!title || !imageUrl || !price || !description) {
      alert("some form value not found");
      return;
    }
    const url = "http://localhost:8000/products";
    const bodyInfo = {
      title: title,
      imageUrl: imageUrl,
      price: parseFloat(price),
      description: description,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyInfo),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.error) {
          throw new Error(result.error);
        }
        alert(
          `${result?.message ?? "Success Created"}:\n${JSON.stringify(
            bodyInfo
          )}`
        );
        router.push("/admin/product-list");
      })
      .catch((error) => console.error("post add-product api error", error));
  };

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

export default AddProductPage;
