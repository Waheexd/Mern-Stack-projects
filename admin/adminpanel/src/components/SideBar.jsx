// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-5 py-3 rounded-r-full transition-all duration-200
   ${isActive ? 'bg-green-100 text-green-700 font-semibold border-l-4 border-green-400' : 'hover:bg-gray-100 text-gray-700'}
  `;

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-2 pt-6 pl-[20%] text-[15px] text-gray-700">
        <NavLink to="/add" className={navLinkClass}>
          <img src={assets.add_icon} alt="Add" className="w-5 h-5" />
          <span className="hidden md:inline">Add Items</span>
        </NavLink>

        <NavLink to="/list" className={navLinkClass}>
          <img src={assets.order_icon} alt="List" className="w-5 h-5" />
          <span className="hidden md:inline">List Items</span>
        </NavLink>

        <NavLink to="/orders" className={navLinkClass}>
          <img src={assets.order_icon} alt="Orders" className="w-5 h-5" />
          <span className="hidden md:inline">Order Items</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
