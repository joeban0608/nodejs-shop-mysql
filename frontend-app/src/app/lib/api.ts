import { GetCartRes, GetOrderRes, ProductsRes } from "./type";

export const getPrducts = async () => {
  const requestOptions = {
    method: "GET",
  };
  const res = await fetch("http://localhost:8000/products", requestOptions);
  const productsRes = (await res.json()) as ProductsRes;
  return productsRes.data;
};

export const getCart = async () => {
  const requestOptions = {
    method: "GET",
  };
  const res = await fetch("http://localhost:8000/cart", requestOptions);
  const cartRes = (await res.json()) as GetCartRes;
  return cartRes.data;
};

export const getOrders = async () => {
  const requestOptions = {
    method: "GET",
  };
  const res = await fetch("http://localhost:8000/orders", requestOptions);
  const orderRes = (await res.json()) as GetOrderRes;
  return orderRes.data;
};

export const postLogin = async () => {
  // auth/login
  try {
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Login res error");
    }
    const loginRes = (await res.json()) as { message?: string; error?: string };

    return loginRes;
  } catch (err) {
    console.error(err);
  }
};

export const getLogin = async () => {
  try {
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Login res error");
    }
    const loginRes = (await res.json()) as { message?: string; error?: string };

    return loginRes;
  } catch (err) {
    console.error(err);
  }
};
