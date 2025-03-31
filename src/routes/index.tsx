import { cn } from "@/utils/cn";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "react-toastify";

export const Route = createFileRoute("/")({
  component: App,
});

type Product = {
  id: number;
  name: string;
  price: number;
  quantity?: number;
};

const products: Product[] = [
  { id: 1, name: "Wireless Headphones", price: 89.99, quantity: 1 },
  { id: 2, name: "Mechanical Keyboard", price: 129.99, quantity: 1 },
  { id: 3, name: "USB-C Charging Cable", price: 14.99, quantity: 1 },
];

function App() {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);
    if (isProductInCart) {
      toast.success(`Increased quantity of ${product.name}`, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "colored",
      });
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
      return;
    }
    toast.success(`${product.name} added to cart`, {
      position: "bottom-right",
      autoClose: 2500,
      theme: "colored",
    });
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemoveFromCart = (productId: number) => {
    const productInCart = cart.find((item) => item.id === productId);
    if (!productInCart) return;

    if (productInCart.quantity && productInCart.quantity > 1) {
      toast.warning(`Reduced quantity of ${productInCart.name}`, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "colored",
      });
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
      );
      return;
    }

    toast.warning(`${productInCart.name} removed from cart`, {
      position: "bottom-right",
      autoClose: 2500,
      theme: "colored",
    });
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleCheckout = () => {
    toast.success("Order placed successfully!", {
      position: "bottom-right",
      autoClose: 2500,
      theme: "colored",
    });
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl bg-gray-800 p-6 flex flex-col items-center shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-300 mb-4">${product.price.toFixed(2)}</p>
            <button
              className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium transition-colors"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        <ul className="space-y-2 mb-4 min-h-[100px] max-h-[300px] overflow-y-auto">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
            >
              <span>{item.name}</span>
              
              <span className="text-gray-400 text-sm">
                Quantity: {item.quantity}
              </span>
              
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}

          {cart.length === 0 && (
            <li className="text-gray-500">Your cart is empty</li>
          )}

          <span className="text-gray-400 text-sm">
            Total: $
            {cart
              .reduce(
                (total, item) => total + item.price * (item.quantity || 1),
                0
              )
              .toFixed(2)}
          </span>
        </ul>

        <button
          className={cn(
            "w-full rounded-xl p-3 font-semibold transition-colors",
            cart.length === 0
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          )}
          disabled={cart.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
