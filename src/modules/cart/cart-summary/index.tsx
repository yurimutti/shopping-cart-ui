import type { Product } from "@/types/product";
import { cn } from "@/utils/cn";
import { CartItem } from "../cart-item";

type CartSummaryProps = {
  cart: Product[];
  onRemove: (id: number) => void;
  onCheckout: () => void;
};

export const CartSummary = ({ cart, onRemove, onCheckout }: CartSummaryProps) => {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <ul
        className="space-y-2 mb-4 min-h-[100px] max-h-[300px] overflow-y-auto"
        role="list"
        aria-label="Shopping cart items"
      >
        {cart.map((item) => (
          <CartItem key={item.id} item={item} onRemove={onRemove} />
        ))}

        {cart.length === 0 && (
          <li className="text-gray-500 text-center">Your cart is empty</li>
        )}
      </ul>

      <span className="text-gray-400 text-sm block mb-4">
        Total: ${total.toFixed(2)}
      </span>

      <button
        className={cn(
          "w-full rounded-xl p-3 font-semibold transition-colors",
          cart.length === 0
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        )}
        disabled={cart.length === 0}
        onClick={onCheckout}
        aria-label="Proceed to checkout"
      >
        Checkout
      </button>
    </div>
  );
};
