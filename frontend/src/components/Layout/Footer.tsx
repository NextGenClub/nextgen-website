import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} NextGen Website. All rights reserved.</p>
                <p>
                    <a href="/about">About Us</a> | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;