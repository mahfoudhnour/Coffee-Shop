import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      {/* Barre de navigation affichée sur toutes les pages */}
      <Navbar />

      {/* Zone centrale où seront rendues les pages enfants (Home, Products, Cart...) */}
      <main>
        <Outlet />  {/* React Router insère ici la route enfant correspondante */}
      </main>

      {/* Pied de page affiché sur toutes les pages */}
      <Footer />
    </>
  );
}