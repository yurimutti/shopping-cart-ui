import { createFileRoute } from "@tanstack/react-router";
import { CartSummary } from "@/modules/cart/cart-summary";
import { ProductsList } from "@/modules/products/products-list";
import productsData from "@/data/products.json";
import { useCart } from "@/modules/cart/hooks/use-cart";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { cart, handleAddToCart, handleRemoveFromCart, handleCheckout } = useCart();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <ProductsList products={productsData} onAddToCart={handleAddToCart} />

      <CartSummary
        cart={cart}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
