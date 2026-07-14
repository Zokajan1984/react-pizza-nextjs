import { create } from "zustand";
import { CartItem } from "@/types/pizza";
import { count } from "console";

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalCount: number;
  addPizza: (pizza: Omit<CartItem, "count">) => void;
  plusPizza: (id: string) => void;
  minusPizza: (id: string) => void;
  removePizza: (id: string) => void;
  clearCart: () => void;
}

const recalculateCart = (items: CartItem[]) => {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  return { totalPrice, totalCount };
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalPrice: 0,
  totalCount: 0,

  addPizza: (newPizza) =>
    set((state) => {
      const findItem = state.items.find((item) => item.id === newPizza.id);
      let updatedItems;

      if (findItem) {
        updatedItems = state.items.map((item) =>
          item.id === newPizza.id ? { ...item, count: item.count + 1 } : item,
        );
      } else {
        updatedItems = [...state.items, { ...newPizza, count: 1 }];
      }

      return { items: updatedItems, ...recalculateCart(updatedItems) };
    }),

  plusPizza: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      );
      return { items: updatedItems, ...recalculateCart(updatedItems) };
    }),

  minusPizza: (id) =>
    set((state) => {
      const updatedItems = state.items
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item,
        )
        .filter((item) => item.count > 0);

      return { items: updatedItems, ...recalculateCart(updatedItems) };
    }),

  removePizza: (id) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);
      return { items: updatedItems, ...recalculateCart(updatedItems) };
    }),

  clearCart: () => set({ items: [], totalPrice: 0, totalCount: 0 }),
}));
