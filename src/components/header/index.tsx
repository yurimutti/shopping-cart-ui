import { ShoppingCart, Store } from "lucide-react";
import { cn } from "@/utils/cn";
import { useCartStore } from "@/stores/cart";

type HeaderProps = {
  onCartClick: () => void;
  cartCount: number;
};

export const Header = ({ onCartClick }: HeaderProps) => {
  const cartAmount = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="w-full bg-white text-red-600 flex items-center justify-between px-8 py-4 shadow-md mb-4 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <Store size={28} />
      </div>

      <button
        onClick={onCartClick}
        className={cn(
          "relative flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-medium transition-colors"
        )}
        aria-label="Open cart"
      >
        <ShoppingCart size={20} />
        <span>Cart</span>

        {cartAmount > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {cartAmount}
          </span>
        )}
      </button>
    </header>
  );
};
