type HeaderProps = {
  cartCount: number;
  onCartClick: () => void;
};

export const Header = ({ cartCount, onCartClick }: HeaderProps) => {
  return (
    <header className="w-full bg-gray-800 text-white p-4 shadow-lg flex items-center justify-between mb-4">
      <h1 className="text-xl font-bold">My Store</h1>

      <button
        onClick={onCartClick}
        className="relative flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium transition-colors"
        aria-label="Open cart"
      >
        Cart
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-gray-900">
          {cartCount}
        </span>
      </button>
    </header>
  );
};
