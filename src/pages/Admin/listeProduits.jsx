import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
//IMPORT STORAGE.JS 
import { getProducts, saveProducts } from "../../utils/storage.js";
function ProductModal({ isOpen, onClose, onSave, product, isEditMode }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "café",
    price: "",
    productId: "",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({ name: "", category: "café", price: "", productId: "" });
    }
  }, [product, isOpen]);

  const handleSubmit = () => {
    if (!formData.name) return alert("Name required");
    if (!formData.price) return alert("Price required");
    if (!formData.productId) return alert("Product ID required");

    onSave({ ...formData, price: parseFloat(formData.price) });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>{isEditMode ? "Edit Product" : "Add Product"}</h3>
        <input
          type="text"
          placeholder="Product name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="café">Coffee</option>
          <option value="pâtisserie">Pastry</option>
          <option value="jus">Juice</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Product ID"
          value={formData.productId}
          onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
        />

        <button onClick={handleSubmit}>
          {isEditMode ? "Update" : "Add"}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  /* RÉCUPÉRATION DES PRODUITS 
     Cette fonction charge les produits stockés dans localStorage
      grâce à getProducts() depuis storage.js
  */
  useEffect(() => {
    const data = getProducts();  // ← ICI ON RÉCUPÈRE LES PRODUITS
    setProducts(data);
  }, []);

  //  Ajouter un produit
  const handleAdd = () => {
    setIsEditMode(false);
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  // Modifier un produit
  const handleEdit = (product) => {
    setIsEditMode(true);
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  /*  SAUVEGARDE DANS STORAGE.JS 
      Cette fonction applique vos modifications dans localStorage
      grâce à saveProducts() depuis storage.js
  */
  const handleSave = (productData) => {
    if (isEditMode) {
      // Mise à jour produit existant
      const updatedList = products.map((p) =>
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      );

      saveProducts(updatedList); //  SAUVEGARDE
      setProducts(updatedList);  //  MET À JOUR L'ÉCRAN
    } else {
      // Ajout d'un nouveau produit
      const newProduct = { ...productData, id: Date.now() };
      const updatedList = [...products, newProduct];

      saveProducts(updatedList); //  SAUVEGARDE
      setProducts(updatedList);  //  MET À JOUR L'ÉCRAN
    }

    setIsModalOpen(false);
  };

  //  Supprimer un produit
  const handleDelete = (id) => {
    const updatedList = products.filter((p) => p.id !== id);

    saveProducts(updatedList);   // ←SAUVEGARDE
    setProducts(updatedList);    //  MET À JOUR L'ÉCRAN
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "café": return "#6d4c41";
      case "pâtisserie": return "#d32f2f";
      case "jus": return "#43a047";
      default: return "#757575";
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Management</h2>

      <button onClick={handleAdd} style={{ marginBottom: "20px" }}>
        <Plus /> Add Product
      </button>

      {/* TABLE */}
      <table style={{ width: "100%", background: "white", borderRadius: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (dt)</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.productId}</td>
              <td>{p.name}</td>
              <td>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "20px",
                    backgroundColor: getCategoryColor(p.category),
                    color: "white",
                  }}
                >
                  {p.category}
                </span>
              </td>
              <td>{p.price} dt</td>

              <td style={{ textAlign: "right" }}>
                <button onClick={() => handleEdit(p)}><Edit /></button>
                <button onClick={() => handleDelete(p.id)}><Trash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        product={editingProduct}
        isEditMode={isEditMode}
      />
    </div>
  );
}
