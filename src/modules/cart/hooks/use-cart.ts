import { useState } from "react";
import { toast } from "react-toastify";
import type { Product } from "@/types/product";

const CART_STORAGE_KEY = "@shop:cart";

export const useCart = () => {
  const [cart, setCartState] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const setCart = (updater: (prevCart: Product[]) => Product[]) => {
    setCartState((prevCart) => {
      const newCart = updater(prevCart);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some((item) => item.id === product.id);

      if (isProductInCart) {
        toast.success(`Increased quantity of ${product.name}`, {
          position: "bottom-right",
          autoClose: 2500,
          theme: "colored",
        });
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success(`${product.name} added to cart`, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "colored",
      });
      return [...prevCart, product];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === productId);
      if (!productInCart) return prevCart;

      if (productInCart.quantity > 1) {
        toast.warning(`Reduced quantity of ${productInCart.name}`, {
          position: "bottom-right",
          autoClose: 2500,
          theme: "colored",
        });
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      toast.warning(`${productInCart.name} removed from cart`, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "colored",
      });
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const handleCheckout = () => {
    setCart(() => []);
    toast.success("Order placed successfully!", {
      position: "bottom-right",
      autoClose: 2500,
      theme: "colored",
    });
  };

  return {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleCheckout,
  };
};
