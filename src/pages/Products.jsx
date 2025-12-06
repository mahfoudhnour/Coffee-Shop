import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import productsData from "../data/products.json";
import "./Products.css";

function Products() {
  const { addToCart } = useContext(CartContext);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [addedId, setAddedId] = useState(null); 
  const [modalImage, setModalImage] = useState(null); // image du modal

  // Filtrage par catégorie
  let filteredProducts = filter === "all"
    ? productsData
    : productsData.filter((p) => p.category === filter);

  // Filtrage par recherche
  if (search.trim() !== "") {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Tri par prix
  if (sort === "asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === "desc") filteredProducts.sort((a, b) => b.price - a.price);

  // Ajouter au panier avec feedback
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  return (
    <div className="products-container">
      <h2>Our Products</h2>

      {/* Contrôles */}
      <div className="products-controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">ALL</option>
          <option value="café">Coffee</option>
          <option value="pâtisserie">Pastry</option>
          <option value="jus">Juice</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Default sort</option>
          <option value="asc">Increasing price</option>
          <option value="desc">Decreasing price</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Liste des produits */}
      <div className="products-list">
        {filteredProducts.length === 0 ? (
          <p>No products found 😕</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`product-card ${addedId === product.id ? "added" : ""}`}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ cursor: "pointer" }}
                onClick={() => setModalImage(product.image)}
              />
              <h3>{product.name}</h3>
              <p>{product.price} dt</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal pour agrandir l'image */}
      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <span className="modal-close">&times;</span>
          <img className="modal-content" src={modalImage} alt="Produit" />
        </div>
      )}
    </div>
  );
}

export default Products;
