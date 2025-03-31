import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Product A", price: 29.99 },
  { id: 2, name: "Product B", price: 49.99 },
  { id: 3, name: "Product C", price: 19.99 },
];

function App() {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    // Check if the product is already in the cart
    const isProductInCart = cart.some((item) => item.id === product.id);
    if (isProductInCart) {
      console.log("Product already in cart");
      return;
    }
    // Add the product to the cart
    console.log("Adding product to cart", product);
  
    setCart((prevCart) => [...prevCart, product]);
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
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}

          {cart.length === 0 && (
            <li className="text-gray-500">Your cart is empty</li>
          )}
        </ul>

        <button className="w-full rounded-xl bg-green-600 hover:bg-green-700 p-3 font-semibold transition-colors">
          Checkout
        </button>
      </div>
    </div>
  );
}
