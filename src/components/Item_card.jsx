// Item_card.js
import React from 'react';
import './styles/Item_card.css';

export const Item_card = ({ img, name, category }) => {
  return (
    <div className='Item-card-wrapper' data-category={category}>
        <img src={img} alt={name} />
        <label>{name}</label>
    </div>
  );
};
