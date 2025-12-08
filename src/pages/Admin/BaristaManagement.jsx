// BaristaManagement.jsx
import React, { useState, useEffect } from "react";
import { Edit2, Trash2, X, Plus, Coffee, Mail, Phone } from "lucide-react";
import { getBaristas, saveBaristas } from "../../utils/storage.js";

export default function BaristaManagement() {
  // State des baristas (chargés depuis localStorage)
  const [baristas, setBaristas] = useState([]);

  // Modal + Form
  const [showModal, setShowModal] = useState(false);
  const [editingBarista, setEditingBarista] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });

  // Charger les baristas une seule fois au démarrage
  useEffect(() => {
    setBaristas(getBaristas());
  }, []);

  // Sauvegarder dans localStorage à chaque modification
  function saveToStorage(updated) {
    saveBaristas(updated);
    setBaristas(updated);
  }

  // Ouvrir modal pour ajouter ou modifier
  function openModal(barista = null) {
    setEditingBarista(barista);
    setFormData(
      barista ? barista : { name: "", email: "", phone: "", status: "Active" }
    );
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingBarista(null);
  }

  // Sauvegarder un barista
  function handleSave() {
    if (editingBarista) {
      // Modifier
      const updated = baristas.map((b) =>
        b.id === editingBarista.id ? { ...editingBarista, ...formData } : b
      );
      saveToStorage(updated);
    } else {
      // Ajouter
      const newBarista = { ...formData, id: Date.now() };
      const updated = [...baristas, newBarista];
      saveToStorage(updated);
    }
    closeModal();
  }

  // Supprimer
  function handleDelete(id) {
    const updated = baristas.filter((b) => b.id !== id);
    saveToStorage(updated);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ color: "black" }}>Barista Management</h2>

      <button
        onClick={() => openModal()}
        style={{ marginBottom: "20px", display: "flex", gap: "5px" }}
      >
        <Plus /> Add Barista
      </button>

      {/* Tableau simple */}
      <table style={{ width: "100%", background: "white" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {baristas.length === 0 && (
            <tr>
              <td
                colSpan="5"
                style={{ textAlign: "center", padding: "20px", color: "#777" }}
              >
                No baristas found.
              </td>
            </tr>
          )}

          {baristas.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.phone}</td>
              <td>{b.status}</td>
              <td>
                <button onClick={() => openModal(b)}>
                  <Edit2 />
                </button>
                <button onClick={() => handleDelete(b.id)}>
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>{editingBarista ? "Edit Barista" : "Add Barista"}</h3>

            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button onClick={handleSave}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
