import React from 'react';
import '../Style.css';
import logoImage from '../../assets/file.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img className="logo" src={logoImage} alt="Logo" />
                <div className="logo-text">Daily Fresh</div>
            </div>
            <div className="navbar-items">
                <span>Home</span>
                <span>Products</span>
                <span>Contact</span>
            </div>
            <div className="icons">
                <span className="icon">🛒</span>
                <span className="icon">👤</span>
            </div>
        </nav>
    );
};

export default Navbar;
