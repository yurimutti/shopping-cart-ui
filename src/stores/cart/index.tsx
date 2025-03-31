import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";
import { toast } from "react-toastify";

type CartState = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  checkout: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const isInCart = cart.some((item) => item.id === product.id);

        if (isInCart) {
          toast.success(`Increased quantity of ${product.name}`);
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ cart: updatedCart });
          return;
        }

        toast.success(`${product.name} added to cart`);
        set({ cart: [...cart, product] });
      },
      removeFromCart: (productId) => {
        const cart = get().cart;
        const item = cart.find((p) => p.id === productId);
        if (!item) return;

        if (item.quantity > 1) {
          toast.warning(`Reduced quantity of ${item.name}`);
          const updatedCart = cart.map((p) =>
            p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
          );
          set({ cart: updatedCart });
          return;
        }

        toast.warning(`${item.name} removed from cart`);
        set({ cart: cart.filter((p) => p.id !== productId) });
      },
      checkout: () => {
        toast.success("Order placed successfully!");
        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
