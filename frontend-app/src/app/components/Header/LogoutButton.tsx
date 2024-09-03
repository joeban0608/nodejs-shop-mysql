"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { getLogin, postLogout } from "@/app/lib/api";

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
