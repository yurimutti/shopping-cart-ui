import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CartItem } from "./";
import type { Product } from "@/types/product";

const mockProduct: Product = {
  id: 1,
  name: "Cheeseburger Combo",
  price: 12.99,
  quantity: 2,
};

describe("<CartItem />", () => {
  it("should render the cart item correctly", () => {
    const { container } = render(
      <CartItem item={mockProduct} onRemove={vi.fn()} />
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Quantity: ${mockProduct.quantity}`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Remove ${mockProduct.name} from cart`,
      })
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should call onRemove when remove button is clicked", () => {
    const onRemove = vi.fn();

    render(<CartItem item={mockProduct} onRemove={onRemove} />);

    const removeButton = screen.getByRole("button", {
      name: `Remove ${mockProduct.name} from cart`,
    });

    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith(mockProduct.id);
  });
});
