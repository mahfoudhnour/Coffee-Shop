import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

// Point d’entrée : on rend toute l’application React dans l’élément #root
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*
      BrowserRouter englobe toute l’application et active la navigation
      via l’URL. Sans lui, Routes, Route, NavLink et Outlet ne fonctionneront pas.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
