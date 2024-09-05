"use client";
import React, { FormEvent, useState } from "react";
import { getLogin, postLogin } from "../lib/api";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import Loading from "../components/Loading";

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
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");
  const [body, setBody] = useState<{ email: string; password: string } | null>(
    null
  );
  const resetData = () => {
    setEmail("");
    setPassword("");
    setIsSubmit(false);
    setBody(null);
  };
  const onSuccess = async () => {
    await resetData();
    await mutate(["api/login", "get"], getLogin);
    await router.push("/");
  };
  const onFailed = async (err: string) => {
    await setError(err);
    // await resetData();
  };
  const {
    // data: LoginRes,
    // error,
    isLoading,
    // mutate: PostLoginMutate,
  } = useSWR(
    isSubmit && body ? ["api/login", "post", body] : null,
    () => {
      if (body) return postLogin({ body, onSuccess, onFailed });
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await setIsSubmit(true);
    await setError("");

    // 在这里处理提交逻辑，例如发送请求到服务器
    const formBody = {
      email: email,
      password: password,
    };
    await setBody(formBody);
    // const res = await postLogin({ body });
    // if (!res?.message) {
    //   console.log("login failed");
    //   return;
    // }
    // await mutate(["api/login", "get"], getLogin);
    // await router.push("/");
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
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error ? (
        <p className="py-2 text-red-500">{error}</p>
      ) : (
        <p className="py-2"></p>
      )}

      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors flex justify-center"
    >
      {isLoading ? <Loading /> : "Login"}
    </button>
  );
};
