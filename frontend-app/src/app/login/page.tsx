"use client";
import React, { FormEvent, useState } from "react";
import { postLogin } from "../lib/api";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  return (
    <div className="w-full h-[calc(100%-56px)] flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // 在这里处理提交逻辑，例如发送请求到服务器
    console.log("Email:", email);
    console.log("Password:", password);

    const res = await postLogin();
    if (!res?.message) {
      console.log("login failed");
      return;
    }
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-80 text-black"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
    </form>
  );
};
