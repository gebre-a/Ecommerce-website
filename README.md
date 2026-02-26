# Ecommerce Website

A modern ecommerce web app built with React and Vite.  
Users can browse products, view details, add items to cart, and complete a simple checkout flow with local authentication.

## Features

- Product listing page
- Product details page
- Add to cart, update quantity, remove item
- Cart total calculation and checkout summary
- Login / Sign Up flow
- Validation messages:
  - `Invalid credentials` for wrong login
  - `Account already exists` for duplicate signup
- LocalStorage-based session and user/cart persistence (client-side)

## Tech Stack

- React 19
- Vite 7
- React Router DOM
- React Hook Form
- Context API (Auth + Cart)
- ESLint

## Project Structure

```text
src/
  components/
    Navbar.jsx
    ProductCard.jsx
  context/
    AuthContextProvider.jsx
    CartContext.jsx
    cartContextObject.jsx
    useCart.jsx
  data/
    products.js
  page/
    Home.jsx
    ProductDetails.jsx
    Checkout.jsx
    Auth.jsx
  App.jsx
  App.css
  main.jsx
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Ecommerce-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- This project currently uses front-end-only auth/cart logic for learning/demo purposes.
- User data is stored in browser LocalStorage (not a backend database).

## Future Improvements

- Add backend authentication (JWT / sessions)
- Persist cart and orders in database
- Add payment integration
- Add product search, filters, and categories
- Improve tests and CI
