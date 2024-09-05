// Filter_bar.js
import React, { useState } from 'react';
import './styles/Filter_bar.css';

export const Filter_bar = ({ categories, onCategoryChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='filter-bar-container'>
            <button onClick={toggleMenu} className='filter-button'>Filter</button>
            {isOpen && (
                <div className='dropdown-menu'>
                    {categories.map((category, index) => (
                        <div key={index} className='dropdown-item'>
                            <input
                                type='checkbox'
                                id={`category-${index}`}
                                onChange={(e) => onCategoryChange(category, e.target.checked)}
                            />
                            <label htmlFor={`category-${index}`}>{category}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
