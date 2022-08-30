import React from 'react';
import Sidebar from "../bars/sidebar.scss";
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/users">
        Users
      </a>

      <a className="menu-item" href="/laravel">
        Animals
      </a>

      <a className="menu-item" href="/angular">
        AboutUs
      </a>

      <a className="menu-item" href="/chatbot">
        Chatbot
      </a>

      <a className="menu-item" href="/vue">
        Archives
      </a>

      <button>
        Logout
      </button>
    </Menu>
  );
};