import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProductsList } from "./";
import type { Product as ProductType } from "@/types/product";

const mockProducts: ProductType[] = [
  {
    id: 1,
    name: "Cheeseburger Combo",
    price: 12.99,
    quantity: 1,
  },
  {
    id: 2,
    name: "Large Pepperoni Pizza",
    price: 18.99,
    quantity: 1,
  },
];

describe("<ProductsList />", () => {
  it("should render all products", () => {
    const { container } = render(
      <ProductsList products={mockProducts} onAddToCart={vi.fn()} />
    );

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(
        screen.getByRole("button", {
          name: `Add ${product.name} to cart`,
        })
      ).toBeInTheDocument();
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should call onAddToCart when add button is clicked", () => {
    const onAddToCart = vi.fn();

    render(<ProductsList products={mockProducts} onAddToCart={onAddToCart} />);

    const addButton = screen.getByRole("button", {
      name: `Add ${mockProducts[0].name} to cart`,
    });

    fireEvent.click(addButton);

    expect(onAddToCart).toHaveBeenCalledWith(mockProducts[0]);
  });
});
