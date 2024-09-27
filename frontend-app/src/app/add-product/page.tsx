"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { ValidationErrorInfo } from "../lib/type";
import DangerousText from "@/app/components/DangerousText";

const AddProductPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrorInfo[]
  >([]);

  const getErrorMsg = (field: string) => {
    const errorInfo = validationErrors.find(
      (validateErrorInfo) => validateErrorInfo.path === field
    );
    if (!errorInfo?.msg) return "";
    return errorInfo.msg;
  };

  const titleError = getErrorMsg("title");
  const imageUrlError = getErrorMsg("imageUrl");
  const priceError = getErrorMsg("price");
  const descriptionError = getErrorMsg("description");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!title || !price || !description) {
      alert("some form value not found");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", (e.target as HTMLFormElement).image.files[0]); // 從 input[type="file"] 取得文件
    formData.append("price", price);
    formData.append("description", description);
    const url = "http://localhost:8000/admin/add-product";
    // const bodyInfo = {
    //   title: title,
    //   imageUrl: imageUrl,
    //   price: parseFloat(price),
    //   description: description,
    // };
    console.log("formData", formData);
    fetch(url, {
      method: "POST",
      // headers: {
      //   // "Content-Type": "application/json",
      //   "Content-Type": "application/json",
      // },
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result?.validationErrors?.length) {
          setValidationErrors(result.validationErrors);
        }
        if (result?.error) {
          throw new Error(result.error);
        }
        setValidationErrors([]);
        alert(
          `${result?.message ?? "Success Created"}:\n${JSON.stringify(
            result?.product ?? { product: "product info..." }
          )}`
        );
        router.push("/admin/product-list");
      })
      .catch((error) => {
        console.error(error);
        alert(`Create Product error: ${error}`);
      });
  };
  useEffect(() => {
    getErrorMsg("title");
  }, [validationErrors]);

  return (
    <section className="w-full h-full flex items-center justify-center">
      <form
        encType="multipart/form-data"
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
            className={`w-full px-3 py-2 border rounded ${
              titleError ? "border-red-500" : ""
            }`}
            required
          />
          <DangerousText text={titleError} />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            // value={imageUrl}
            // onChange={(e) => setImageUrl(e.target.value)}
            className={`w-full px-3 py-2 border rounded ${
              imageUrlError ? "border-red-500" : ""
            }`}
            required
          />
          {/* <DangerousText text={imageUrlError} /> */}
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
            className={`w-full px-3 py-2 border rounded ${
              priceError ? "border-red-500" : ""
            }`}
            step="0.01"
            required
          />
          <DangerousText text={priceError} />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3 py-2 border rounded ${
              descriptionError ? "border-red-500" : ""
            }`}
            required
          />
          <DangerousText text={descriptionError} />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddProductPage;
