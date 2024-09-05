// Items_galery.js
import React, { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { Item_card } from './Item_card';
import './styles/Item_galery.css';

export const Items_galery = ({ selectedCategories = [] }) => {
    const { items, fetchItems } = useContext(AuthContext);

    useEffect(() => {
        fetchItems(); // Fetch items on mount
    }, [fetchItems]);

    const filteredItems = items.filter(item =>
        selectedCategories.length === 0 || selectedCategories.includes(item.category)
    );

    return (
        <div className='items-galery-card-container'>
            {filteredItems.length === 0 ? (
                <div>Cargando...</div>
            ) : (
                filteredItems.map(item => (
                    <Item_card
                        key={item.id}
                        img={item.image}
                        name={item.product_name}
                        category={item.category}
                    />
                ))
            )}
        </div>
    );
};
