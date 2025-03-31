import type { Product } from "@/types/product";

type CartItemProps = {
  item: Product;
  onRemove: (id: number) => void;
};

export const CartItem = ({ item, onRemove }: CartItemProps) => {
  return (
    <li
      className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
      role="listitem"
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium text-red-600">{item.name}</span>
        <span className="text-gray-500 text-sm">Quantity: {item.quantity}</span>
      </div>

      <button
        className="text-red-600 hover:text-red-700 text-sm font-medium"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        Remove
      </button>
    </li>
  );
};
