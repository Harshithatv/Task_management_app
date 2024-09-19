import React from 'react';
import './Layout.css'; // Import the layout styles
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="content">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
