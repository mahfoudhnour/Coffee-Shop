import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { login, currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // -----------------------------
    // VALIDATION CONTROLS
    // -----------------------------
    if (!email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Email must contain '@'.");
      return;
    }

    setLoading(true);

    try {
      const success = login(email, password);

      if (!success) {
        setError("Email or password incorrect");
        setLoading(false);
        return;
      }

      const savedUser = localStorage.getItem("currentUser");
      const user = JSON.parse(savedUser);

      // ROLE REDIRECTION
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "barista") {
        navigate("/BaristaDashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Demo Accounts:</strong></p>
          <p>Admin: admin@cafemiranda.com / admin123</p>
          <p>Barista: barista@cafemiranda.com / barista123</p>
        </div>
      </div>
    </div>
  );
}
