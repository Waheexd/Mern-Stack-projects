// src/components/Navbar.jsx
import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center justify-between px-[4%] py-3 bg-white shadow-sm border-b border-gray-200">
      {/* Logo */}
      <img src={assets.logo} alt="Logo" className="w-20 object-contain" />

      {/* Logout Button */}
      <button className="bg-gray-600 hover:bg-gray-800 text-white px-5 py-2 rounded-full text-sm" onClick={()=>setToken('')}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
