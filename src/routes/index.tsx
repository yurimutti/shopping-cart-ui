import { createFileRoute } from "@tanstack/react-router";
import { ProductsList } from "@/modules/products/products-list";
import productsData from "@/data/products.json";
import { Header } from "@/components/header";
import { CartDrawer } from "@/modules/cart/cart-drawer";
import { useState } from "react";
import type { Product } from "@/types/product";
import { useCartStore } from "@/stores/cart";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, removeFromCart, checkout } = useCartStore();

  const handleAddAndOpenCart = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <div className="flex-col gap-4">
      <Header onCartClick={() => setIsCartOpen(true)} cartCount={cart.length} />
      <ProductsList
        products={productsData}
        onAddToCart={handleAddAndOpenCart}
      />
      <CartDrawer
        handleAddToCart={addToCart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />
    </div>
  );
}
