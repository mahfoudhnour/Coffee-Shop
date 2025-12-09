import "./Navbar.css";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">☕ Coffee Shop</div>
      <ul className="nav-links">
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
