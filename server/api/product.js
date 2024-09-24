// src/api/product.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assuming you have a Product model

// Add a new product
router.post('/add', async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        const newProduct = new Product({ name, description, price, image });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

module.exports = router;
