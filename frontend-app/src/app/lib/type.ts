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
};

export type ProductsRes = {
  data: ProductInfo[];
};
export type ProductInfoRes = {
  data: ProductInfo;
};

export type CartItem = {
  id: string;
  quantity: number;
  createdAt: string;
  updatedAt: number;
  cartId: number;
  productId: number;
};

export type GetCartRes = {
  data: ProductInfo[];
};

/* 
  [
      {
          "id": 1,
          "title": "123",
          "price": 123,
          "imageUrl": "https://plus.unsplash.com/premium_photo-1669069604803-0825937f070b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "description": "123",
          "createdAt": "2024-08-28T06:25:32.000Z",
          "updatedAt": "2024-08-28T06:25:32.000Z",
          "userId": 1,
          "cartItem": {
              "id": 1,
              "quantity": 2,
              "createdAt": "2024-08-28T06:26:55.000Z",
              "updatedAt": "2024-08-28T06:27:42.000Z",
              "cartId": 1,
              "productId": 1
          }
      }
  ]
*/
