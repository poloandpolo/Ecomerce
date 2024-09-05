import React from 'react';
import './styles/DropdownMenu.css';

export const DropdownMenu = ({ onLogout, onAddProduct }) => {
  return (
    <div className="dropdown-menu">
      <ul>
        <li onClick={onAddProduct}>Add Product</li> {/* Llama a onAddProduct al hacer clic */}
        <li onClick={onLogout}>Logout</li> {/* Llama a onLogout al hacer clic */}
      </ul>
    </div>
  );
};

