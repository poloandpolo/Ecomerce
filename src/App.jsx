import React, { useState } from 'react';
import { Filter_bar } from './components/Filter_bar';
import { Items_galery } from './components/Items_galery';
import './App.css';
import { Header } from './components/Header';
import { Register_form_modal } from './components/Register_form_modal';
import { Login_form_modal } from './components/Login_form_modal';
import { Register_product_form_modal } from './components/Register_product_form_modal';
import { AuthProvider } from './components/context/AuthContext';

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false); // Estado para el modal de producto

  const categories = [
    "Kids", "Shoes", "Computers", "Grocery", "Automotive", "Toys", "Tools",
    "Health", "Sports", "Outdoors", "Jewelery", "Movies", "Industrial",
    "Music", "Baby", "Beauty", "Games", "Garden", "Home", "Electronics", "Books"
  ].sort();

  const handleCategoryChange = (category, isChecked) => {
    setSelectedCategories(prevCategories =>
      isChecked
        ? [...prevCategories, category]
        : prevCategories.filter(c => c !== category)
    );
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openProductModal = () => {
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
  };

  return (
    <>
    <AuthProvider>
      {isRegisterModalOpen && (
        <Register_form_modal 
          onClose={closeRegisterModal} 
          onOpenLoginModal={openLoginModal} 
        />
      )}
      {isLoginModalOpen && <Login_form_modal onClose={closeLoginModal} />}
      {isProductModalOpen && <Register_product_form_modal onClose={closeProductModal} />} 
      <Header 
        onLoginClick={openLoginModal} 
        onRegisterClick={openRegisterModal} 
        onProductClick={openProductModal} 
      />
      <div className='items-section'>
        <Filter_bar categories={categories} onCategoryChange={handleCategoryChange} />
        <Items_galery selectedCategories={selectedCategories} />
      </div>
      </AuthProvider>
    </>
  );
};

export default App;