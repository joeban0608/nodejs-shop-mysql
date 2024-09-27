"use client";
import { ProductInfoRes, ValidationErrorInfo } from "@/app/lib/type";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import Loading from "@/app/components/Loading";
import DangerousText from "@/app/components/DangerousText";

const AdminEditProductPage = () => {
  const router = useRouter();
  // const pid = params.id;
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    ValidationErrorInfo[]
  >([]);
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
    if (!id) {
      alert("product id not found");
    }
    // Handle form submission logic here
    if (!title || !price || !description) {
      alert("some value not found");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", (e.target as HTMLFormElement).image.files[0]); // 從 input[type="file"] 取得文件
    formData.append("price", price);
    formData.append("description", description);
    const url = `http://localhost:8000/admin/edit-product/${id}`;

    fetch(url, {
      method: "PUT",
      credentials: "include",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result?.validationErrors?.length) {
          setValidationErrors(result.validationErrors);
        }
        if (result?.error) {
          throw new Error(result.error);
        }
        setValidationErrors([]);
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
    setDescription(data.description);
    setPrice(data.price.toString());
    return () => {
      setTitle("");
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
            className={`w-full px-3 py-2 border rounded 
              ${imageUrlError ? "border-red-500" : ""}`}
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

export default AdminEditProductPage;
