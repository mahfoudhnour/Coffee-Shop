import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Coffee } from 'lucide-react';

const menuItems = [
  { text: 'Dashboard', icon: <LayoutDashboard />, path: '/admin' },//nafshom les pths li f app.jsx mtaa rooting c'est lui qui dirige vraiment React Router vers la bonne page.
  { text: 'Liste Produits', icon: <Package />, path: '/admin/liste-produits' },
  { text: 'Orders', icon: <ShoppingCart />, path: '/admin/Orders' },
  { text: 'Barista Management', icon: <Coffee />, path: '/admin/barista-management' },
];
//compsant principale
export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar */}
      <div style={{ width: '220px', background: '#5d4037', color: 'white', padding: '20px' }}>
        <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>☕ Coffee Admin</h2>
      {/*Créer automatiquement les boutons du menu admin*/}
        {menuItems.map(item => (//map() = boucle transforme liste en composants react
          <NavLink//composant mta3 reactrouter (Crée un lien navigable+compare automatiquement son prop to avec l’URL actuelle)
            key={item.text}//id mta3o khdha text khatro unique fel case hedhi
            to={item.path}//ki nenzel hezni lil path hedha
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              marginBottom: '10px',
              borderRadius: '6px',
              textDecoration: 'none',
              color: 'white',
              background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent'
            })}
          >
            {item.icon}
            {item.text}
          </NavLink>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flexGrow: 1, padding: '40px', background: '#f8f3e9' }}>
        <Outlet />
      </div>
    </div>
  );
}
