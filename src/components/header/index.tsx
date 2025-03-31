import { ShoppingCart } from "lucide-react"; // ou qualquer ícone que use
import { cn } from "@/utils/cn";

type HeaderProps = {
  onCartClick: () => void;
  cartCount: number;
};

export const Header = ({ onCartClick, cartCount }: HeaderProps) => {
  return (
    <header className="w-full bg-gray-800 text-white flex items-center justify-between px-8 py-4 shadow-lg mb-4">
      <h1 className="text-2xl font-bold">My Shop</h1>

      <button
        onClick={onCartClick}
        className={cn(
          "relative flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 font-medium transition-colors"
        )}
        aria-label="Open cart"
      >
        <ShoppingCart size={20} />
        <span>Cart</span>

        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
};
