import { cn } from "@/utils/cn";
import type { Product } from "@/types/product";
import { CartSummary } from "../cart-summary";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  onRemove: (productId: number) => void;
  handleAddToCart: (product: Product) => void;
  onCheckout: () => void;
};

export const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onRemove,
  onCheckout,
  handleAddToCart,
}: CartDrawerProps) => {
  return (
    <div
      role="presentation"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 transition-opacity",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-lg transition-transform border-l border-gray-200",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">Your Cart</h2>
          <button
            className="text-gray-500 hover:text-red-600 text-xl"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <CartSummary
          cart={cart}
          onRemove={onRemove}
          onAdd={handleAddToCart}
          onCheckout={() => {
            onCheckout();
            onClose();
          }}
        />
      </div>
    </div>
  );
};
