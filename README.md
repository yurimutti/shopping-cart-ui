# 🛒 Shopping Cart UI

Welcome to the **Shopping Cart UI Challenge**!

This project delivers a complete and functional shopping cart interface, including product management, quantity control, total calculation, a checkout flow, persistent state, and improved user experience.

---

## 🚀 Getting Started

### Installation

To run this project locally:

```bash
pnpm install
pnpm start
```

### Building for Production

To build this application for production:

```bash
pnpm build
```

### Running Tests

This project uses **Vitest** for testing. Run tests with:

```bash
pnpm test
```

---

## 🎯 Features

- 🛍️ Product list with **Add to Cart** functionality
- ➕ Increase or decrease product quantity
- ❌ Remove products from cart
- 💰 Dynamic total price calculation
- 🔄 Reset cart option
- ✅ Checkout flow with success message
- 💾 Cart persisted in **localStorage**
- 🔔 Visual feedback with toast notifications
- 📱 Responsive design (Desktop & Mobile)
- 📂 Clean and scalable folder architecture

---

## 🛠️ Technologies Used

- **React 19** – UI Library
- **TypeScript** – Type Safety
- **Vite** – Fast development and build tool
- **Tailwind CSS** – Utility-first styling
- **Zustand** – Lightweight state management
- **React Toastify** – Feedback and notifications
- **@tanstack/react-router** – Routing system
- **Vitest + Testing Library** – Unit and component testing
- **localStorage API** – Persist cart data

---

## 🌐 Live Demo

You can check the live project here:

[Shopping Cart UI – Live Demo](https://shopping-cart-ui-rosy.vercel.app/)

---

## 📂 Project Structure

```
src/
├── components/           # Shared components (Header, etc.)
│   └── header/
├── data/                 # Static product data
├── modules/              # Core UI modules (ProductList, Cart, etc.)
├── routes/               # Application routes
├── stores/               # Global state (Zustand - cart)
│   └── cart/
├── types/                # TypeScript types
├── utils/                # Utility functions (toasts, helpers)
```

---

## 📄 Additional Notes

- Project uses **clean folder-by-feature architecture**
- Unit tests added for main modules
- **TanStack Router** used for future scalability
- Toast notifications provide clear user feedback
- Cart automatically resets on checkout
- Cart data is persisted using **localStorage**
