import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { getOrders, saveOrders, getLoggedUser } from "../utils/storage";

export default function Checkout() {
  const cartCtx = useContext(CartContext);

  if (!cartCtx) {
    return (
      <div className="checkout-page">
        <h2>Validation de la commande</h2>
        <p style={{ color: "red" }}>
          Erreur : CartContext introuvable.
        </p>
      </div>
    );
  }

  const { cart, clearCart, total } = cartCtx;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const hasItems = cart && cart.length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!hasItems) {
      setError("Votre panier est vide.");
      return;
    }

    if (!isConfirmed) {
      setError("Veuillez confirmer la commande.");
      return;
    }

  

    setIsSubmitting(true);

    try {
      const existingOrders = getOrders();

      const newOrder = {
        id:
          existingOrders.length > 0
            ? Math.max(...existingOrders.map((o) => Number(o.id) || 0)) + 1
            : 1,
        email: logged.email, // ✔ automatiquement
        items: cart,
        total,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      saveOrders([...existingOrders, newOrder]);
      clearCart();

      alert(`Commande confirmée ! Numéro : ${newOrder.id}`);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la création de la commande.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="checkout-page">
      <h2>Validation de la commande</h2>

      {!hasItems && <p>Votre panier est vide.</p>}

      {hasItems && (
        <>
          <h3>Résumé du panier</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x {item.qty} — {item.price} dt
              </li>
            ))}
          </ul>

          <p>
            <strong>Total :</strong> {total.toFixed(2)} dt
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            {/* ✔ Checkbox confirmation */}
            <label style={{ display: "block", marginBottom: "1rem" }}>
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={() => setIsConfirmed(!isConfirmed)}
              />{" "}
              Je confirme ma commande
            </label>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Traitement..." : "Confirmer la commande"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
