import "./Navbar.css";

function Navbar({ setActivePage }) {
  return (
    <nav className="navbar">
      <div className="logo">☕ Coffee Shop</div>

      <ul className="nav-links">
       <li>
          <a href="#home" onClick={() => setActivePage("home")}>Home</a>
        </li>
        <li>
          <a href="#products" onClick={() => setActivePage("products")}>Products</a>
        </li>
        <li><a href="#cart" onClick={() => setActivePage("cart")}>Shopping Cart</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
