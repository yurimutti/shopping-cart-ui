import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Product } from "./";
import type { Product as ProductType } from "@/types/product";

const mockProduct: ProductType = {
  id: 1,
  name: "Cheeseburger Combo",
  price: 12.99,
  quantity: 1,
};

describe("<Product />", () => {
  it("should render product information correctly", () => {
    const { container } = render(
      <Product product={mockProduct} onAddToCart={vi.fn()} />
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: `Add ${mockProduct.name} to cart`,
      })
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should call onAddToCart when add button is clicked", () => {
    const onAddToCart = vi.fn();

    render(<Product product={mockProduct} onAddToCart={onAddToCart} />);

    const addButton = screen.getByRole("button", {
      name: `Add ${mockProduct.name} to cart`,
    });

    fireEvent.click(addButton);

    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
