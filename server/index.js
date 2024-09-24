const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/user');
const ProductModel = require('./models/product');  // New Product Model
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/user", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("Could not connect to MongoDB:", error));

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("success");
                } else {
                    res.json("password is incorrect");
                }
            } else {
                res.json("User not found");
            }
        })
        .catch(error => res.json(error));
});

// Register route
app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(error => res.json(error));
});

// Forgot Password route
app.post('/forgotpassword', (req, res) => {
    const { email } = req.body;  
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.json("User not found");
            }
            const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'akhilaugustine2025@mca.ajce.in',
                    pass: ''  // Use environment variables for security
                }
            });

            var mailOptions = {
                from: 'akhilaugustine2025@mca.ajce.in',
                to: email,  
                subject: 'Reset Password Link',
                text: `http://localhost:5173/resetpassword/${user._id}/${token}`  
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.json({ Status: "Error" });
                } else {
                    return res.json({ Status: "Success", Info: info });
                }
            });
        })
        .catch(error => res.json(error));
});

// Reset Password route
app.post('/resetpassword/:userId/:token', (req, res) => {
    const { userId, token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, 'jwt_secret_key');
        if (decoded.id !== userId) {
            return res.status(401).send({ Status: "Invalid token" });
        }

        UserModel.findByIdAndUpdate(userId, { password: password }, { new: true })
            .then(user => {
                if (!user) {
                    return res.status(404).send({ Status: "User not found" });
                }
                return res.send({ Status: "Success" });
            })
            .catch(error => res.status(500).send({ Status: "Error updating password" }));
    } catch (error) {
        return res.status(400).send({ Status: "Invalid token or token expired" });
    }
});
// Get all products route
app.get('/api/products', (req, res) => {
    ProductModel.find()
        .then(products => res.json(products))
        .catch(error => res.status(500).json({ message: "Error fetching products", error }));
});

// Add Product route
app.post('/api/add', (req, res) => {
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    ProductModel.create({ name, description, price, image })
        .then(product => res.json(product))
        .catch(error => res.status(500).json({ message: "Error creating product", error }));
});

// Get Products route
app.get('/api/products', (req, res) => {
    ProductModel.find()
        .then(products => res.json(products))
        .catch(error => res.status(500).json({ message: "Error fetching products", error }));
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
