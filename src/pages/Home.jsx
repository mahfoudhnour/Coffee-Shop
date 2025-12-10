import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      {/* Titre principal */}
      <h1 className="home-title">Welcome to our Coffee Shop</h1>

      {/* Sous-titre */}
      <p className="home-subtitle">
        The secret ingredient is always love ☕🍰🧃
      </p>

      {/* Image banner */}
      <img
        src="Coffee Shop.png"
        alt="Coffee Banner"
        className="home-banner"
      />
    </div>
  );
}

export default Home;
