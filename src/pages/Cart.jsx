import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, clearCart, total } = useContext(CartContext);

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
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>Price: {item.price} €</p>
              <p>Quantity: {item.qty}</p>
            </div>
            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total : {total.toFixed(2)} €</h3>
        <button className="clear-btn" onClick={clearCart}>
          Empty the shopping cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
