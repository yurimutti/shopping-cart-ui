import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CartDrawer } from "./";
import type { Product } from "@/types/product";

const mockProduct: Product = {
  id: 1,
  name: "Cheeseburger Combo",
  price: 12.99,
  quantity: 2,
};

describe("<CartDrawer />", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    cart: [mockProduct],
    onRemove: vi.fn(),
    onCheckout: vi.fn(),
    handleAddToCart: vi.fn(),
  };

  it("should render when open", () => {
    const { container } = render(<CartDrawer {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: /your cart/i })
    ).toBeInTheDocument();

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should be hidden when closed", () => {
    const { container } = render(
      <CartDrawer {...defaultProps} isOpen={false} />
    );

    expect(container.querySelector(".opacity-0")).toBeTruthy();
  });

  it("should call onClose when overlay is clicked", () => {
    render(<CartDrawer {...defaultProps} />);

    const overlay = screen.getByRole("presentation");
    fireEvent.click(overlay);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("should call onClose when close button is clicked", () => {
    render(<CartDrawer {...defaultProps} />);

    const closeButton = screen.getByRole("button", {
      name: /close cart/i,
    });
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("should call onCheckout and onClose when checkout is clicked", () => {
    render(<CartDrawer {...defaultProps} />);

    const checkoutButton = screen.getByRole("button", { name: /checkout/i });
    fireEvent.click(checkoutButton);

    expect(defaultProps.onCheckout).toHaveBeenCalled();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
