// BaristaDashboard.jsx
import React, { useState, useEffect } from "react";
import { Coffee, Clock, CheckCircle, Package } from "lucide-react";
import { getOrders, saveOrders } from "../../utils/storage.js";
import "./BaristaDashboard.css";

const statusColors = {
  Pending: "#e67e22",
  Preparing: "#5d4037",
  Completed: "#689f38",
};

const statusIcons = {
  Pending: <Clock size={16} />,
  Preparing: <Coffee size={16} />,
  Completed: <CheckCircle size={16} />,
};

export default function BaristaDashboard() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  // Charger les commandes au démarrage
  useEffect(() => {
    setOrders(getOrders());
  }, []);
  // Sauvegarder + mettre à jour l'état
  const updateStatus = (id, newStatus) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );

    saveOrders(updated);
    setOrders(updated);
  };

  // Filtrage
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const countByStatus = (status) =>
    orders.filter((o) => o.status === status).length;

  return (
    <div className="dashboard">
      <header className="header">
        <h1>
          <Coffee size={28} /> Barista Dashboard
        </h1>
        <div>{new Date().toLocaleDateString("en-US")}</div>
      </header>

      <section className="stats">
        <div className="stat" onClick={() => setFilter("Pending")}>
          <Clock size={24} color="#e67e22" /> Pending: {countByStatus("Pending")}
        </div>
        <div className="stat" onClick={() => setFilter("Preparing")}>
          <Coffee size={24} color="#5d4037" /> Preparing: {countByStatus("Preparing")}
        </div>
        <div className="stat" onClick={() => setFilter("Completed")}>
          <CheckCircle size={24} color="#689f38" /> Completed: {countByStatus("Completed")}
        </div>
        <div className="stat" onClick={() => setFilter("all")}>
          <Package size={24} /> Total: {orders.length}
        </div>
      </section>

      <section className="filters">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
          All Orders
        </button>
        <button
          className={filter === "Pending" ? "active" : ""}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </button>
        <button
          className={filter === "Preparing" ? "active" : ""}
          onClick={() => setFilter("Preparing")}
        >
          Preparing
        </button>
        <button
          className={filter === "Completed" ? "active" : ""}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </section>

      <section className="orders">
        {filteredOrders.length === 0 && (
          <div className="no-orders">No Orders</div>
        )}

        {filteredOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <div className="order-number">{order.orderNumber}</div>
                <div className="customer">{order.email}</div>
              </div>
              <div className="time">
                {new Date(order.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="items">
              {order.items?.map((item, idx) => (
                <div key={idx}>
                  {item.qty}x {item.name}
                </div>
              ))}
            </div>

            <div
              className="status"
              style={{ backgroundColor: statusColors[order.status] }}
            >
              {statusIcons[order.status]} {order.status}
            </div>

            <div className="actions">
              {order.status === "Pending" && (
                <button onClick={() => updateStatus(order.id, "Preparing")}>
                  Start
                </button>
              )}
              {order.status === "Preparing" && (
                <button onClick={() => updateStatus(order.id, "Completed")}>
                  Complete
                </button>
              )}
              {order.status === "Completed" && <div>Ready</div>}
            </div>

            <div className="total">
              Total: {order.total?.toFixed(2)} dt
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}