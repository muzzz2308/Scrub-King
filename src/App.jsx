import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import MainLayout from "./layout/MainLayout";
import ProductDetails from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import About from "./pages/About";
import CheckoutPage from "./pages/Checkout";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
