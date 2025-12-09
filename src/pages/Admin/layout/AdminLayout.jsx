import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Coffee, LogOut } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';

const menuItems = [
  { text: 'Dashboard', icon: <LayoutDashboard />, path: '/admin' },
  { text: 'Liste Produits', icon: <Package />, path: '/admin/liste-produits' },
  { text: 'Orders', icon: <ShoppingCart />, path: '/admin/Orders' },
  { text: 'Barista Management', icon: <Coffee />, path: '/admin/barista-management' },
];

export default function AdminLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar */}
      <div style={{ 
        width: '220px',
        background: '#5d4037',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        
        <div>
          <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>☕ Coffee Admin</h2>

          {menuItems.map(item => (
            <NavLink
              key={item.text}
              to={item.path}
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

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            padding: '12px',
            borderRadius: '6px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

      {/* Main content */}
      <div style={{ flexGrow: 1, padding: '40px', background: '#f8f3e9' }}>
        <Outlet />
      </div>
    </div>
  );
}
