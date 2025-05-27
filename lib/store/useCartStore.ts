import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/components/ui/ProductData";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  decrementItem: (id: number) => void;
  removeItem: (id: number) => void;
  totalItems: () => number;
  totalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { ...product, quantity: 1 }],
            };
          }
        }),

      decrementItem: (id: number) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === id);

          if (existingItem && existingItem.quantity > 1) {
            return {
              items: state.items.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
              ),
            };
          } else {
            return {
              items: state.items.filter((item) => item.id !== id),
            };
          }
        }),

      removeItem: (id: number) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
