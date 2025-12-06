import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  // Récupération des données et fonctions du panier via le contexte global
  const { cart, removeFromCart, clearCart, total } = useContext(CartContext);

  // Si le panier est vide, on affiche un message dédié
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>My Shopping Cart</h2>
        <p>Your Shopping Cart is empty 🛒</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>My Shopping Cart</h2>

      {/* Liste des produits ajoutés au panier */}
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />

            {/* Informations du produit */}
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>Prix : {item.price} dt</p>
              <p>Quantité : {item.qty}</p>
            </div>

            {/* Bouton de suppression d’un produit */}
            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Résumé et actions globales du panier */}
      <div className="cart-summary">
        <h3>Total : {total.toFixed(2)} dt</h3>

        {/* Bouton pour vider entièrement le panier */}
        <button className="clear-btn" onClick={clearCart}>
          Empty the shopping cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
