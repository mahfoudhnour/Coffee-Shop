import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getOrders, saveOrders } from "../../utils/storage.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  // Charger les commandes au démarrage
  useEffect(() => {
    const data = getOrders();
    setOrders(data);
    setFiltered(data);
  }, []);
  // Filtrage selon status et recherche
  useEffect(() => {
    let result = [...orders];
    // Search by order number or email
    const s = search.toLowerCase().replace("#", "");
    if (s) {
      result = result.filter((o) => {
        const orderNumber = o.orderNumber?.toString() || "";
        const email = o.email?.toLowerCase() || "";
        return orderNumber.includes(s) || email.includes(s);
      });
    }
    // Filter by status
    if (status !== "all") {
      result = result.filter((o) => o.status === status);
    }

    setFiltered(result);
  }, [search, status, orders]);

  // Mettre à jour le statut et sauvegarder
  const updateStatus = (id, newStatus) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    saveOrders(updated); // Sauvegarde dans localStorage
    setOrders(updated);  // Met à jour l'écran
  };
  // Status color
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#ff9800" };
      case "Preparing":
        return { backgroundColor: "#03a9f4" };
      case "Completed":
        return { backgroundColor: "#4caf50" };
      default:
        return { backgroundColor: "#999" };
    }
  };
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "black" }}>Orders Management</h2>
      {/* Filters */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#fff", border: "1px solid #ccc", padding: "8px 12px", borderRadius: "6px", width: "260px",color:"black" }}>
          <Search size={18}/>
          <input
            type="text"
            placeholder="Search by number or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", outline: "none", flex: 1, fontSize: "14px",background:"transparent",color:"black" }}
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc", background: "white", fontSize: "14px" ,color:"black"}}
        >
          <option value="all">All statuses</option>
          <option value="En attente">Pending</option>
          <option value="En préparation">Preparing</option>
          <option value="Terminée">Completed</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ marginTop: "20px", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 10px" }}>
        {filtered.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ background: "#6d4c41", color: "white", padding: "12px", textAlign: "left", fontSize: "14px" }}>Order #</th>
                <th style={{ background: "#6d4c41", color: "white", padding: "12px", textAlign: "left", fontSize: "14px" }}>Email</th>
                <th style={{ background: "#6d4c41", color: "white", padding: "12px", textAlign: "left", fontSize: "14px" }}>Date</th>
                <th style={{ background: "#6d4c41", color: "white", padding: "12px", textAlign: "left", fontSize: "14px" }}>Items</th>
                <th style={{ background: "#6d4c41", color: "white", padding: "12px", textAlign: "left", fontSize: "14px" }}>Total</th>
                <th style={{ background: "#6d4c41", color: "white", padding: "12px", textAlign: "left", fontSize: "14px" }}>Status</th>
                <th style={{ background: "#6d4c41", color: "white", padding: "12px", textAlign: "left", fontSize: "14px" }}>Update</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((o) => (
                <tr 
                  key={o.orderNumber}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f7f2ec";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "";
                  }}
                >
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee", fontSize: "14px" }}>#{o.orderNumber}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee", fontSize: "14px" }}>{o.email}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee", fontSize: "14px" }}>{new Date(o.date).toLocaleDateString()}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee", fontSize: "14px" }}>{o.items?.length || 0} items</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee", fontSize: "14px" }}>{o.total?.toFixed(2)} dt</td>

                  <td style={{ padding: "12px", borderBottom: "1px solid #eee", fontSize: "14px" }}>
                    <span style={{ 
                      padding: "6px 10px", 
                      borderRadius: "6px", 
                      color: "white", 
                      fontSize: "13px",
                      ...getStatusStyle(o.status)
                    }}>
                      {o.status}
                    </span>
                  </td>

                  <td style={{ padding: "12px", borderBottom: "1px solid #eee", fontSize: "14px" }}>
                    <select
                      style={{ padding: "6px 8px", borderRadius: "6px", border: "1px solid #ccc", background: "white" }}
                      value={o.status}
                      onChange={(e) =>
                        updateStatus(o.orderNumber, e.target.value)
                      }
                    >
                      <option value="En attente">Pending</option>
                      <option value="En préparation">Preparing</option>
                      <option value="Terminée">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "#777", padding: "30px" }}>No orders found.</p>
        )}
      </div>
    </div>
  );
}