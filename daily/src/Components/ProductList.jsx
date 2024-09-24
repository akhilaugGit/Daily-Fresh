import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Dashboard/ProductCard/ProductCard'

const ProductList = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from the backend
    useEffect(() => {
        axios.get('http://localhost:3001/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);  // Empty dependency array means this useEffect runs once when the component is mounted.

    return (
        <div className="product-list">
            <h2>Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard
                        key={product._id}  // Assuming each product has a unique _id field
                        image={product.image}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
