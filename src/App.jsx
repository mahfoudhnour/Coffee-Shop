import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";

// Client 
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
// Admin pages
import AdminLayout from "./pages/admin/layout/AdminLayout";
import Dashboard from "./pages/admin/dashboard";
import ListeProduits from "./pages/admin/listeProduits";
import Orders from "./pages/admin/orders";
import BaristaManagement from "./pages/admin/BaristaManagement";

// Barista page
import BaristaDashboard from "./pages/barista/BaristaDashboard";

function App() {
  return (
    <CartProvider>
      <Routes>
        
        {/* Layout principal pour le CLIENT */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />

          {/* ADMIN LAYOUT → contient le sidebar + Outlet */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Dashboard par défaut */}
            <Route index element={<Dashboard />} />

            {/* Autres pages admin */}
            <Route path="liste-produits" element={<ListeProduits />} />
            <Route path="orders" element={<Orders />} />
            <Route path="barista-management" element={<BaristaManagement />} />
          </Route>

          {/* BARISTA */}
          <Route path="/BaristaDashboard" element={<BaristaDashboard />} />

        </Route>

      </Routes>
    </CartProvider>
  );
}

export default App;
