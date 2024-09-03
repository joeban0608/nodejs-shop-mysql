"use client";
import React from "react";
import { postLogout } from "../lib/api";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";

const LogoutButton = () => {
  const router = useRouter();
  const fetchLogin = async () => {
    const res = await postLogout();
    console.log("logout res:", res);
    if (res?.error || !res) {
      return;
    }
    await mutate("api/login", null, false);
    await router.push("/login");
  };

  return (
    <button className="hover:bg-slate-600 p-4" onClick={fetchLogin}>
      Logout
    </button>
  );
};

export default LogoutButton;
