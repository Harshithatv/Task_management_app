import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaTasks } from 'react-icons/fa';
import './Sidebar.css'; // Import Sidebar styles

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <div className="sidebar">
      <div className="logo">
        <a href="https://www.asistbt.com.tr/wp-content/uploads/2021/06/taskmanager-600x264.png" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://www.asistbt.com.tr/wp-content/uploads/2021/06/taskmanager-600x264.png"  // Replace with the actual image URL
            alt="Logo" 
            className="logo-image" 
          />
        </a>
      </div>
      <ul className="menu">
        <li
          className={activeMenu === 'dashboard' ? 'menu-item active' : 'menu-item'}
          onClick={() => setActiveMenu('dashboard')}
        >
          <NavLink to="/" exact>
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li
          className={activeMenu === 'tasks' ? 'menu-item active' : 'menu-item'}
          onClick={() => setActiveMenu('tasks')}
        >
          <NavLink to="/tasks">
            <FaTasks /> Tasks
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
