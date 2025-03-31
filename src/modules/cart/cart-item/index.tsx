
import type { Product } from "@/types/product";

type CartItemProps = {
  item: Product;
  onRemove: (id: number) => void;
};

export const CartItem = ({ item, onRemove }: CartItemProps) => {
  return (
    <li
      className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
      role="listitem"
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium">{item.name}</span>
        <span className="text-gray-400 text-sm">Quantity: {item.quantity}</span>
      </div>

      <button
        className="text-red-500 hover:text-red-600 text-sm"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        Remove
      </button>
    </li>
  );
};
