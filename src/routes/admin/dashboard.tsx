import React, { useState } from 'react';
import { Home, MapPin, Utensils, Users } from 'lucide-react';
import AdminKulinerPage from './kuliner';
import Destinasi from './adminDestinations';
const AdminDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      id: 'destinations', 
      label: 'Destinasi', 
      icon: <MapPin className="w-5 h-5" /> 
    },
    { 
      id: 'culinary', 
      label: 'Kuliner', 
      icon: <Utensils className="w-5 h-5" /> 
    },
    { 
      id: 'management', 
      label: 'Pengurus Desa', 
      icon: <Users className="w-5 h-5" /> 
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold text-blue-600">Desa Admin</h1>
        </div>

        {/* Menu Items */}
        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`
                flex items-center w-full p-3 text-left 
                ${activeMenu === item.id 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'hover:bg-gray-100 text-gray-700'}
              `}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-6">
          {menuItems.find(item => item.id === activeMenu)?.label}
        </h2>
        {/* Placeholder for content based on selected menu */}
        <div className="bg-white p-6 rounded-lg shadow">
          {activeMenu === 'dashboard' && <p>Dashboard content goes here</p>}
          {activeMenu === 'destinations' && <Destinasi />}
          {activeMenu === 'culinary' && <AdminKulinerPage />}
          {activeMenu === 'management' && <p>Pengurus Desa content goes here</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;