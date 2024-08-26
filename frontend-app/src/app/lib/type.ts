export type ProductInfo = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductsRes = {
  data: ProductInfo[];
};
export type ProductInfoRes = {
  data: ProductInfo;
};
