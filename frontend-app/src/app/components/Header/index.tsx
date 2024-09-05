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
  } = useSWR(["api/login", "get"], getLogin, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const isLoggined = session?.isLoggedIn;
  const pathname = usePathname();
  const router = useRouter();
  const allowedPaths = ["/", "/shop", "/product-list", "/login", "/sign-up"];

  useEffect(() => {
    if (!isLoggined && !allowedPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [pathname, isLoggined]);

  return (
    <header className="w-full  bg-slate-500 flex overflow-auto text-nowrap min-h-[3.5rem]">
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <Loading />
        </div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <div className="flex">
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
          </div>

          <div className="flex">
            {!isLoggined && (
              <>
                <Link className="hover:bg-slate-600 p-4" href="/login">
                  Login
                </Link>
                <Link className="hover:bg-slate-600 p-4" href="/sign-up">
                  Sign Up
                </Link>
              </>
            )}
            {isLoggined && <LogoutButton />}
          </div>
        </div>
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
];
