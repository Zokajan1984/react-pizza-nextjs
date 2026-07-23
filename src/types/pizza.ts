// src/types/pizza.ts

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  categoryId: string;
  description?: string;
}

export interface CartItem {
  id: string; // "productId-type-size"
  productId: string;
  name: string;
  imageUrl: string;
  type: "thin" | "traditional";
  size: 26 | 30 | 40;
  price: number;
  count: number;
}

export interface Order {
  id?: string;
  items: CartItem[]; // Строго массив продуктов в заказе
  totalPrice: number;
  customerName: string;
  phone: string;
  address: string;
  status: "pending" | "completed";
  createdAt: string;
}
