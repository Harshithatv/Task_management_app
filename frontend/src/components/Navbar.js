import React from 'react';
import { FaEnvelope, FaBell, FaUserCircle } from 'react-icons/fa';
import './Navbar.css'; // Import Navbar styles

const Navbar = () => {
  const username = 'User';
  const messages = 3; // Example static data
  const notifications = 5; // Example static data

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <p>Welcome, {username}!</p>
      </div>
      <div className="navbar-right">
        <div className="badge-container">
          <FaEnvelope size={24} className="icon" />
          <span className="badge badge1">{messages}</span>
        </div>
        <div className="badge-container">
          <FaBell size={24} className="icon" />
          <span className="badge badge2">{notifications}</span>
        </div>
        <FaUserCircle size={32} className="icon profile-pic" />
      </div>
    </nav>
  );
};

export default Navbar;
