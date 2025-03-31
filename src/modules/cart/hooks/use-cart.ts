import { useState } from "react";
import { toast } from "react-toastify";
import type { Product } from "@/types/product";

export const useCart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);

    if (isProductInCart) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success(`Increased quantity of ${product.name}`, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }

    setCart((prevCart) => [...prevCart, product]);
    toast.success(`${product.name} added to cart`, {
      position: "bottom-right",
      autoClose: 2500,
      theme: "colored",
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    const productInCart = cart.find((item) => item.id === productId);
    if (!productInCart) return;

    if (productInCart.quantity > 1) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      toast.warning(`Reduced quantity of ${productInCart.name}`, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }

    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.warning(`${productInCart.name} removed from cart`, {
      position: "bottom-right",
      autoClose: 2500,
      theme: "colored",
    });
  };

  const handleCheckout = () => {
    setCart([]);
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
