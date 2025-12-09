import "./Navbar.css";
<<<<<<< HEAD
import { NavLink } from "react-router-dom";
=======
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

>>>>>>> dab28fa485e58ec8215de46f59c3da751b15b68e
export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation(); // get current route

  return (
    <nav className="navbar">
      <div className="logo">☕ Coffee Shop</div>
<<<<<<< HEAD
=======

>>>>>>> dab28fa485e58ec8215de46f59c3da751b15b68e
      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/cart">Cart</NavLink></li>

        {/* Only show login button on homepage and if user is not logged in */}
        {!currentUser && location.pathname === "/" && (
          <li>
            <NavLink 
              to="/login"
              style={{
                background: '#e74c3c',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 'bold'
              }}
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
