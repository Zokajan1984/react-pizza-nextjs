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
  id: string;
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
  items: CartItem[];
  totalPrice: number;
  customerName: string;
  phone: string;
  address: string;
  status: "pending" | "completed";
  createdAt: string;
}

export interface ApiResponseProducts {
  data: Product[];
}

export interface ApiResponseCategories {
  data: Category[];
}
