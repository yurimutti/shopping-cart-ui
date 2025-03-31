import type { Product } from "@/types/product";

type CartSummaryProps = {
  cart: Product[];
  onRemove: (productId: number) => void;
  onAdd: (product: Product) => void;
  onCheckout: () => void;
};

export const CartSummary = ({
  cart,
  onRemove,
  onAdd,
  onCheckout,
}: CartSummaryProps) => {
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-4">
      <ul
        className="space-y-2 mb-4 min-h-[100px] max-h-[600px] overflow-y-auto"
        role="list"
        aria-label="Shopping cart items"
      >
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-400 text-sm">
                Quantity: {item.quantity}
              </span>
              <span className="text-gray-400 text-sm">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onRemove(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
                aria-label={`Remove one ${item.name}`}
              >
                -
              </button>
              <button
                onClick={() => onAdd(item)}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
                aria-label={`Add one ${item.name}`}
              >
                +
              </button>
            </div>
          </li>
        ))}

        {cart.length === 0 && (
          <li className="text-gray-500 text-center">Your cart is empty</li>
        )}
      </ul>

      <div className="flex justify-between items-center mb-4 text-sm text-gray-300">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        onClick={onCheckout}
        disabled={cart.length === 0}
        className={`w-full rounded-xl p-3 font-semibold transition-colors ${
          cart.length === 0
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        Checkout
      </button>
    </div>
  );
};
