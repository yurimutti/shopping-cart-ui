import { Product } from "../product";
import type { Product as ProductType } from "@/types/product";

type ProductsListProps = {
  products: ProductType[];
  onAddToCart: (product: ProductType) => void;
};

export const ProductsList = ({ products, onAddToCart }: ProductsListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-7xl mb-12 mx-auto">
      {products.map((product) => (
        <Product key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};
