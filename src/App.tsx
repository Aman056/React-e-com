import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/home";
import ProductDetail from "./Components/productDetails";
import Footer from "./Components/footer";
import { CartContext } from "./Components/cartContext";
import { cartStore } from "./Components/cartStore";
import Cart from "./Components/cart";

export default function App() {
  return (
    <CartContext.Provider value={cartStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id/details" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartContext.Provider>
  );
}