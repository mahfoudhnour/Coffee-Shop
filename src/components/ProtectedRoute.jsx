import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser?.role !== requiredRole) {
 
    if (currentUser?.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (currentUser?.role === "barista") {
      return <Navigate to="/BaristaDashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};