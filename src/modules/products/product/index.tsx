import type { Product as ProductType } from "@/types/product";

type ProductProps = {
  product: ProductType;
  onAddToCart: (product: ProductType) => void;
};

export const Product = ({ product, onAddToCart }: ProductProps) => {
  return (
    <div className="rounded-2xl bg-white p-6 flex flex-col items-center shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-2 text-black text-center">
        {product.name}
      </h2>
      <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
      <button
        className="rounded-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-medium transition-colors"
        onClick={() => onAddToCart(product)}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>
    </div>
  );
};
