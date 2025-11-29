import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// The main navigation bar displayed across all pages (inside Layout)
export default function Navbar() {

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      
      {/* App logo / brand */}
      <div className="logo">☕ Coffee Shop</div>

      {/* Navigation links */}
      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/cart">Cart</NavLink></li>
      </ul>

      {/* Authentication section */}
      <div className="auth-section">

        {/* If not logged in → show Login button */}
        {!currentUser && (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}

        {/* If logged in → show email + logout */}
        {currentUser && (
          <>
            <span className="user-email">{currentUser.email}</span>

            {/* Admin button only if role=admin */}
            {currentUser.role === "admin" && (
              <Link to="/admin" className="admin-btn">
                Admin
              </Link>
            )}

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}
