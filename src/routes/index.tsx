import { createFileRoute } from "@tanstack/react-router";
import { ProductsList } from "@/modules/products/products-list";
import productsData from "@/data/products.json";
import { useCart } from "@/modules/cart/hooks/use-cart";
import { Header } from "@/components/header";
import { CartDrawer } from "@/modules/cart/cart-drawer";
import { useState } from "react";
import type { Product } from "@/types/product";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cart, handleAddToCart, handleRemoveFromCart, handleCheckout } =
    useCart();

  const handleAddAndOpenCart = (product: Product) => {
    handleAddToCart(product);
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
        handleAddToCart={handleAddToCart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
