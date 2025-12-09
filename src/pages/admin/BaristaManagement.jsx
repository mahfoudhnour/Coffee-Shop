// BaristaManagement.jsx
import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, X, Plus, Coffee, Mail, Phone } from 'lucide-react';
import { getBaristas, saveBaristas } from "../../utils/storage.js";
export default function BaristaManagement() {
  const [baristas, setBaristas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBarista, setEditingBarista] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", status: "Active" });
  //lit les baristas depuis localStorage marra barka ki ytcharja l compsant w ysetih f bariste 
  useEffect(() => {
    setBaristas(getBaristas());
  }, []);
  //ici on On sauvegarde la nouvelle version dans localStorage + n met à jour l’état de React
  function saveToStorage(updated) {
    saveBaristas(updated);
    setBaristas(updated);
  }
  // Ouvrir modal pour ajouter ou modifier (it depends with argument)
  function openModal(barista = null) {
    setEditingBarista(barista);
    setFormData(barista ? barista : { name: "", email: "", phone: "", status: "Active" });//kn barista estdeja fournit (modification) talka lform fiha barista else lokhrin 
    setShowModal(true);
  }
  // fermer modal
  function closeModal() {
    setShowModal(false);
    setEditingBarista(null);
  }
  // Sauvegarder un barista
  function handleSave() {
    if (editingBarista) {
      // Modifier
     const updated = baristas.map(b =>
     b.id === editingBarista.id ? { ...editingBarista, ...formData } : b
      );
    // Houni ken el condition mta3 map tji TRUE (yaani el id mta3 el barista elli ndor aalih 3lih houwa nafsou id mta3 el barista elli nheb na3mlou edit)
    } else {
      // Ajouter
      const newBarista = { ...formData, id: Date.now() };//par exemple : 1733690238000
      const updated = [...baristas, newBarista];
      saveToStorage(updated);
    }
    closeModal();
  }
  // Supprimer
  function handleDelete(id) {
    const updated = baristas.filter(b => b.id !== id);
    saveToStorage(updated);
  }
  return (
    <div style={{ padding: "40px" }}>
      <h2>Barista Management</h2>
      <button onClick={() => openModal()} style={{ marginBottom: "20px" }}>
        <Plus /> Add Barista
      </button>
      {/* Tableau simple */}
      <table style={{ width: "100%", background: "white" }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {baristas.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No baristas found.
              </td>
            </tr>
          )}
          {baristas.map(b => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.phone}</td>
              <td>{b.status}</td>
              <td>
                <button onClick={() => openModal(b)}><Edit2 /></button>
                <button onClick={() => handleDelete(b.id)}><Trash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
            <h3>{editingBarista ? "Edit Barista" : "Add Barista"}</h3>
            <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
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
