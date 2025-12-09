import "./Home.css";
function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to our Coffee Shop</h1>
      <p className="home-subtitle">
        The secret ingredient is always love ☕🍰🧃
      </p>
      <img
        src="Coffee Shop.png"
        alt="Coffee Banner"
        className="home-banner"
      />
    </div>
  );
}

export default Home;
