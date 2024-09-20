import { GetCartRes, GetOrderRes, ProductsRes } from "./type";

export const getPrductsRes = async (page: number) => {
  const res = await fetch(`http://localhost:8000/products?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const productsRes = (await res.json()) as ProductsRes;
  return productsRes;
};
export const getPrducts = async () => {
  const res = await fetch("http://localhost:8000/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const productsRes = (await res.json()) as ProductsRes;
  return productsRes.data;
};

export const getAdminPrducts = async () => {
  const res = await fetch("http://localhost:8000/admin/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const productsRes = (await res.json()) as ProductsRes;
  return productsRes.data;
};

export const getCart = async () => {
  const res = await fetch("http://localhost:8000/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const cartRes = (await res.json()) as GetCartRes;
  return cartRes.data;
};

export const getOrders = async () => {
  const res = await fetch("http://localhost:8000/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const orderRes = (await res.json()) as GetOrderRes;
  return orderRes.data;
};

export const postLogin = async ({
  body,
  onSuccess,
  onFailed,
}: {
  body: {
    email: string;
    password: string;
  };
  onSuccess: () => void;
  onFailed: (err: string) => void;
}) => {
  // auth/login
  try {
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errorInfo = await res.json();
      throw new Error(errorInfo.error);
    }
    const loginRes = (await res.json()) as { message?: string; error?: string };
    onSuccess();
    return loginRes;
  } catch (err: any) {
    onFailed(err.message);
    console.error(err);
    return { error: err.message };
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
    const loginRes = (await res.json()) as {
      session?: { user?: {}; isLoggedIn?: boolean };
    };
    if (!loginRes?.session?.user) return null;
    return loginRes.session;
  } catch (err) {
    console.error(err);
  }
};

export const postLogout = async () => {
  // auth/login
  try {
    const res = await fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Login res error");
    }
    const logoutRes = (await res.json()) as {
      message?: string;
      error?: string;
    };

    return logoutRes;
  } catch (err) {
    console.error(err);
  }
};
