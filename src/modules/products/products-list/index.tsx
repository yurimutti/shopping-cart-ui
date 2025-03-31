import { Product } from "../product";
import type { Product as ProductType } from "@/types/product";

type ProductsListProps = {
  products: ProductType[];
  onAddToCart: (product: ProductType) => void;
};

export const ProductsList = ({ products, onAddToCart }: ProductsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
      {products.map((product) => (
        <Product key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};
