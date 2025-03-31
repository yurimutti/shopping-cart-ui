import type { Product as ProductType } from "@/types/product";

type ProductProps = {
  product: ProductType;
  onAddToCart: (product: ProductType) => void;
};

export const Product = ({ product, onAddToCart }: ProductProps) => {
  return (
    <div className="rounded-2xl bg-gray-800 p-6 flex flex-col items-center shadow-lg">
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-300 mb-4">${product.price.toFixed(2)}</p>
      <button
        className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium transition-colors"
        onClick={() => onAddToCart(product)}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>
    </div>
  );
};
