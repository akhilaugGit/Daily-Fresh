import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css'

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!product.name || !product.description || !product.price || !product.image) {
            setMessage("All fields are required");
            return;
        }

        // Post product to the server
        axios.post('http://localhost:3001/api/add', product)
            .then(response => {
                setMessage("Product added successfully");
                setProduct({ name: '', description: '', price: '', image: '' });  // Clear form
            })
            .catch(error => {
                console.error("There was an error adding the product!", error);
                setMessage("Error adding product");
            });
    };

    return (
        <div className="add-product-container">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                    />
                </div>

                <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Enter product price"
                    />
                </div>

                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </div>

                <button type="submit">Add Product</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default AddProduct;
