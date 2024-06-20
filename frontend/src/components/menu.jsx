import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="profile-pic"></div>
        <h2>Hi, khairyo!</h2>
        <p>sushimallows8@gmail.com</p>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item active">Tips</li>
      </ul>
    </div>
  );
}

export default Sidebar;