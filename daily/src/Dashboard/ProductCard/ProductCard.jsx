import React from 'react';
import './ProductCard.css';
const ProductCard = ({ image, name, description, price }) => {
    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-image" />
            <h3>{name}</h3>
            <p>{description}</p>
            <span>Price: ₹{price}</span>
        </div>
    );
};

export default ProductCard;
