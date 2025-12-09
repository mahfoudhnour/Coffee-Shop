import React, { useEffect, useState } from "react";
import { getProducts, getOrders, getBaristas } from "../../utils/storage.js";
import { Coffee, Package, DollarSign, Users } from "lucide-react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [baristas, setBaristas] = useState([]);

  // Charger les données réelles
  useEffect(() => {
    setProducts(getProducts());
    setOrders(getOrders());
    setBaristas(getBaristas());
  }, []);

  //  CALCUL DES STATISTIQUES
  // total produits
  const totalProducts = products.length;
  // total baristas
  const totalBaristas = baristas.length;
  // total commandes
  const totalOrders = orders.length;
  // chiffre d'affaires : reduce ( fait une calcul cummulatif / sum varable li bch nacumilow fiha / order : element courant mta3 tableau / fi kol marra atakho .total / si non y akho 0 /0lekhrani valeur initial  )
  const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  // commandes par statut
  const pending = orders.filter((o) => o.status === "Pending").length;
  const preparing = orders.filter((o) => o.status === "Preparing").length;
  const completed = orders.filter((o) => o.status === "Completed").length;
  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      {/* Cards */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Produits */}
        <div style={card}>
          <Coffee size={30} />
          <h3>{totalProducts}</h3>
          <p>Products</p>
        </div>
        {/* Commandes */}
        <div style={card}>
          <Package size={30} />
          <h3>{totalOrders}</h3>
          <p>Total Orders</p>
        </div>
        {/* Revenue */}
        <div style={card}>
          <DollarSign size={30} />
          <h3>{revenue.toFixed(2)} dt</h3>
          <p>Revenue</p>
        </div>
        {/* Baristas */}
        <div style={card}>
          <Users size={30} />
          <h3>{totalBaristas}</h3>
          <p>Baristas</p>
        </div>
      </div>
      {/* Statistiques commandes */}
      <div style={{ marginTop: "40px" }}>
        <h3>Orders Breakdown</h3>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={statusCard("#ff9800")}>
            <h4>{pending}</h4>
            <p>Pending</p>
          </div>
          <div style={statusCard("#03a9f4")}>
            <h4>{preparing}</h4>
            <p>Preparing</p>
          </div>
          <div style={statusCard("#4caf50")}>
            <h4>{completed}</h4>
            <p>Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
const card = {
  width: "200px",
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: "white",
  textAlign: "center",
  boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
};

const statusCard = (color) => ({
  width: "150px",
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: color,
  color: "white",
  textAlign: "center",
});
