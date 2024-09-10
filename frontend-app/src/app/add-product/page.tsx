"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { ValidationErrorInfo } from "../lib/type";

/* 
[
    {
        "type": "field",
        "value": "1",
        "msg": "title at least 3 characters",
        "path": "title",
        "location": "body"
    },
    {
        "type": "field",
        "value": "1",
        "msg": "image must be url",
        "path": "imageUrl",
        "location": "body"
    },
    {
        "type": "field",
        "value": "1",
        "msg": "description at least 5 characters, less than 400 characters.",
        "path": "description",
        "location": "body"
    }
]
*/
const AddProductPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
    if (!title || !imageUrl || !price || !description) {
      alert("some form value not found");
      return;
    }
    const url = "http://localhost:8000/admin/add-product";
    const bodyInfo = {
      title: title,
      imageUrl: imageUrl,
      price: parseFloat(price),
      description: description,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyInfo),
    })
      .then((response) => {
        console.log("response", response);
        return response.json();
      })
      .then((result) => {
        console.log("result", result);
        if (result?.validationErrors?.length) {
          setValidationErrors(result.validationErrors);
        }
        if (result?.error) {
          throw new Error(result.error);
        }
        setValidationErrors([]);
        alert(
          `${result?.message ?? "Success Created"}:\n${JSON.stringify(
            bodyInfo
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
            className={`w-full px-3 py-2 border rounded ${
              titleError ? "border-red-500" : ""
            }`}
            required
          />
          <DangerousText text={titleError} />
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
            className={`w-full px-3 py-2 border rounded ${
              imageUrlError ? "border-red-500" : ""
            }`}
            required
          />
          <DangerousText text={imageUrlError} />
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
    </div>
  );
};

export default AddProductPage;

const DangerousText = ({ text }: { text: string }) => {
  return text && <p className="text-sm text-red-600">{text}</p>;
};
