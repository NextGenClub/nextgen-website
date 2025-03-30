import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <h1 className="logo">NextGen Website</h1>
                    <nav className="main-nav">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/submit-idea">Submit an Idea</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;