import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-dvw h-dvh`}>
        <header className="w-full p-4 bg-slate-400 flex gap-8">
          <Link href="/">Home</Link>
          <Link href="shop">Shop</Link>
          <Link href="product-list">Products</Link>
          <Link href="add-product">Add Product</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
