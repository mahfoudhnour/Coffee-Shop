import "./Navbar.css";
import { NavLink } from "react-router-dom";
// The main navigation bar displayed across all pages (inside Layout)
export default function Navbar() {
  return (
    <nav className="navbar">
      
      {/* App logo / brand */}
      <div className="logo">☕ Coffee Shop</div>

      {/* Navigation links using NavLink for automatic "active" styling */}
      <ul className="nav-links">
        {/* NavLink applies an "active" class when the route matches */}
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/cart">Cart</NavLink></li>
        <li>      <NavLink 
            to="/admin" 
            style={{
              background: '#e74c3c',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}
          >
            🔧 Admin
          </NavLink></li>
             <li> <NavLink 
            to="/BaristaDashboard" 
            style={{
              background: '#e74c3c',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}
          >
            🔧 barista
          </NavLink></li>
      </ul>

    </nav>
  );
}
