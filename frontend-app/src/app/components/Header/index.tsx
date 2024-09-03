"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import LogoutButton from "./LogoutButton";
import useSWR from "swr";
import { getLogin } from "@/app/lib/api";
import Loading from "../Loading";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const {
    data: session,
    error,
    isLoading,
  } = useSWR("api/login", getLogin, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const isLoggined = session?.isLoggedIn;
  const pathname = usePathname();
  const router = useRouter();
  const allowedPaths = ["/", "/shop", "/product-list", "/login"];

  useEffect(() => {
    if (!isLoggined && !allowedPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [pathname, isLoggined]);

  return (
    <header className="w-full  bg-slate-500 flex gap-8 overflow-auto text-nowrap min-h-[3.5rem]">
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <Loading />
        </div>
      ) : (
        <>
          {navList.map((navInfo) => {
            if (
              navInfo.isShowType === "both" ||
              (navInfo.isShowType === "login" && isLoggined) ||
              (navInfo.isShowType === "logout" && !isLoggined)
            ) {
              return (
                <Link
                  key={navInfo.name}
                  className="hover:bg-slate-600 p-4"
                  href={navInfo.href}
                >
                  {navInfo.name}
                </Link>
              );
            }
            return null;
          })}
          {isLoggined && <LogoutButton />}
        </>
      )}
    </header>
  );
};

export default Header;

const navList = [
  { href: "/", name: "Home", isShowType: "both" },
  { href: "/shop", name: "Shop", isShowType: "both" },
  { href: "/product-list", name: "Products", isShowType: "both" },
  { href: "/cart", name: "Cart", isShowType: "login" },
  { href: "/order", name: "Orders", isShowType: "login" },
  { href: "/add-product", name: "Add Product", isShowType: "login" },
  { href: "/admin", name: "Admin Product", isShowType: "login" },
  { href: "/login", name: "Login", isShowType: "logout" },
];
