import React from 'react';
import './styles/Header.css';
import logo from '../images/DEV_f.jpg';
import { useAuthContext } from './hooks/useAuth';
import { DropdownMenu } from './DropdownMenu';

export const Header = ({ onLoginClick, onRegisterClick, onProductClick }) => {
  const { userData, logout } = useAuthContext();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='header-container'>
      <div className='header-container-logo-wrapper'>
        <img src={logo} alt="Logo" />
      </div>
      <div className='header-container-searching-bar-wrapper'>
        <input type='text' placeholder='Search...'></input>
      </div>
      <div className='header-container-log-menus-wrapper'>
        {userData ? (
          <div className="user-dropdown">
            <label onClick={handleDropdownToggle}>{userData.first_name}</label>
            {isDropdownOpen && (
              <DropdownMenu
                onLogout={logout}
                onAddProduct={onProductClick} // Pasar la función para abrir el modal de producto
              />
            )}
          </div>
        ) : (
          <>
            <label onClick={onLoginClick}>Login</label>
            <label onClick={onRegisterClick}>Sign in</label>
          </>
        )}
      </div>
    </div>
  );
};