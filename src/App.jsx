import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { initProducts } from "./utils/storage";

// Client 
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login"; // Add Login page

// Admin pages
import AdminLayout from "./pages/admin/layout/AdminLayout";
import Dashboard from "./pages/admin/dashboard";
import ListeProduits from "./pages/admin/listeProduits";
import Orders from "./pages/admin/orders";
import BaristaManagement from "./pages/admin/BaristaManagement";

// Barista page
import BaristaDashboard from "./pages/barista/BaristaDashboard";
import Checkout from "./pages/checkout";

initProducts();

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Layout principal pour le CLIENT */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout/>}/>

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="liste-produits" element={<ListeProduits />} />
              <Route path="orders" element={<Orders />} />
              <Route path="barista-management" element={<BaristaManagement />} />
            </Route>

            {/* Barista route */}
            <Route
              path="/BaristaDashboard"
              element={
                <ProtectedRoute requiredRole="barista">
                  <BaristaDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;