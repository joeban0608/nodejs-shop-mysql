export type ProductInfo = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  cartItem?: CartItem;
  orderItem?: OrderItem;
  user?: {
    email: string;
  };
};

export type ProductsRes = {
  data: ProductInfo[];
};
export type ProductInfoRes = {
  data: ProductInfo;
  error?: string;
};

export type CartItem = {
  id: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  cartId: string;
  productId: string;
};

export type GetCartRes = {
  data: ProductInfo[];
};

export type OrderItem = {
  id: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  productId: string;
};
export type OrderInfo = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  products: ProductInfo[];
};

export type GetOrderRes = {
  data: OrderInfo[];
};

export type ValidationErrorInfo = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

/* 
  [
    {
      type: "field",
      value: "1",
      msg: "title at least 3 characters",
      path: "title",
      location: "body",
    },
  ];
*/
