import { useState } from "react";
import { CartProvider } from "./context/CartProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <CartProvider>
      <Navbar setActivePage={setActivePage} />
      {activePage === "home" && <Home />}
      {activePage === "products" && <Products />}
      {activePage === "cart" && <Cart />}
      <Footer />
    </CartProvider>
  );
}

export default App;
