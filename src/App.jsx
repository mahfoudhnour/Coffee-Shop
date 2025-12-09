import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { initProducts } from "./utils/storage";


import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
<<<<<<< HEAD
// Admin pages
=======
import Login from "./pages/Login"; // Add Login page


>>>>>>> dab28fa485e58ec8215de46f59c3da751b15b68e
import AdminLayout from "./pages/admin/layout/AdminLayout";
import Dashboard from "./pages/admin/dashboard";
import ListeProduits from "./pages/admin/listeProduits";
import Orders from "./pages/admin/orders";
import BaristaManagement from "./pages/admin/BaristaManagement";
<<<<<<< HEAD
// Barista page
=======


>>>>>>> dab28fa485e58ec8215de46f59c3da751b15b68e
import BaristaDashboard from "./pages/barista/BaristaDashboard";


initProducts();

function App() {
  return (
<<<<<<< HEAD
    <CartProvider>
      <Routes>
        {/* Layout principal pour le CLIENT */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
=======
    <AuthProvider>
      <CartProvider>
        <Routes>
         
          <Route path="/login" element={<Login />} />
          
        
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
>>>>>>> dab28fa485e58ec8215de46f59c3da751b15b68e

        
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="liste-produits" element={<ListeProduits />} />
              <Route path="orders" element={<Orders />} />
              <Route path="barista-management" element={<BaristaManagement />} />
            </Route>

       
            <Route path="/BaristaDashboard" element={
              <ProtectedRoute requiredRole="barista">
                <BaristaDashboard />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;