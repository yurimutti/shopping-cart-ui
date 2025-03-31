import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CartSummary } from "./";
import type { Product } from "@/types/product";

const mockProduct: Product = {
  id: 1,
  name: "Cheeseburger Combo",
  price: 12.99,
  quantity: 2,
};

describe("<CartSummary />", () => {
  const defaultProps = {
    cart: [mockProduct],
    onRemove: vi.fn(),
    onAdd: vi.fn(),
    onCheckout: vi.fn(),
  };

  it("should render cart items correctly", () => {
    const { container } = render(<CartSummary {...defaultProps} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Quantity: ${mockProduct.quantity}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${(mockProduct.price * mockProduct.quantity).toFixed(2)}`)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Checkout" })
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render empty state when cart is empty", () => {
    render(
      <CartSummary {...defaultProps} cart={[]} />
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Checkout" })).toBeDisabled();
  });

  it("should call onAdd when add button is clicked", () => {
    render(<CartSummary {...defaultProps} />);

    const addButton = screen.getByRole("button", {
      name: `Add one ${mockProduct.name}`,
    });

    fireEvent.click(addButton);
    expect(defaultProps.onAdd).toHaveBeenCalledWith(mockProduct);
  });

  it("should call onRemove when remove button is clicked", () => {
    render(<CartSummary {...defaultProps} />);

    const removeButton = screen.getByRole("button", {
      name: `Remove ${mockProduct.name}`,
    });

    fireEvent.click(removeButton);
    expect(defaultProps.onRemove).toHaveBeenCalledWith(mockProduct.id);
  });

  it("should call onRemove when decrement button is clicked", () => {
    render(<CartSummary {...defaultProps} />);

    const decrementButton = screen.getByRole("button", {
      name: `Remove one ${mockProduct.name}`,
    });

    fireEvent.click(decrementButton);
    expect(defaultProps.onRemove).toHaveBeenCalledWith(mockProduct.id);
  });

  it("should call onCheckout when checkout button is clicked", () => {
    render(<CartSummary {...defaultProps} />);

    const checkoutButton = screen.getByRole("button", { name: "Checkout" });
    fireEvent.click(checkoutButton);

    expect(defaultProps.onCheckout).toHaveBeenCalled();
  });
});
