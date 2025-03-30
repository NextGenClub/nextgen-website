import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} NextGen Website. All rights reserved.</p>
                    <div className="footer-links">
                        <Link to="/about">About Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;