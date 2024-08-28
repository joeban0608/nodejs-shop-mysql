import { ProductsRes } from "./type";

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
  const cartRes = (await res.json()) as ProductsRes;
  return cartRes.data;
};
