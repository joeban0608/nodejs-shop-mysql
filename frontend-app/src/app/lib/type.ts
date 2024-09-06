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

/* 
[
    {
        "id": 1,
        "createdAt": "2024-08-29T05:23:01.000Z",
        "updatedAt": "2024-08-29T05:23:01.000Z",
        "userId": 1,
        "products": [
            {
                "id": 2,
                "title": "456",
                "price": 456,
                "imageUrl": "https://images.unsplash.com/photo-1566125882500-87e10f726cdc?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "description": "456",
                "createdAt": "2024-08-29T05:14:30.000Z",
                "updatedAt": "2024-08-29T05:14:30.000Z",
                "userId": 1,
                "orderItem": {
                    "id": 2,
                    "quantity": 1,
                    "createdAt": "2024-08-29T05:23:01.000Z",
                    "updatedAt": "2024-08-29T05:23:01.000Z",
                    "orderId": 1,
                    "productId": 2
                }
            },
            {
                "id": 1,
                "title": "123",
                "price": 123,
                "imageUrl": "https://plus.unsplash.com/premium_photo-1669069604803-0825937f070b?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "description": "123",
                "createdAt": "2024-08-29T05:14:12.000Z",
                "updatedAt": "2024-08-29T05:14:12.000Z",
                "userId": 1,
                "orderItem": {
                    "id": 1,
                    "quantity": 1,
                    "createdAt": "2024-08-29T05:23:01.000Z",
                    "updatedAt": "2024-08-29T05:23:01.000Z",
                    "orderId": 1,
                    "productId": 1
                }
            }
        ]
    }
]

*/
