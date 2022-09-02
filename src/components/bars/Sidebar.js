import React from 'react';
import Sidebar from "../bars/sidebar.scss";
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/users">
        Users
      </a>

      <a className="menu-item" href="/animals">
        Animals
      </a>

      <a className="menu-item" href="/aboutus">
        AboutUs
      </a>

      <a className="menu-item" href="/chatbot">
        Chatbot
      </a>

      <a className="menu-item" href="/archive">
        Archives
      </a>

      <button>
        Logout
      </button>
    </Menu>
  );
};