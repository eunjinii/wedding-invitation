import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p style={footerTextStyle}>© 2026 배준식 & 이은진. All rights reserved.</p>
            <p style={footerTextStyle}>Designed with love by our friends.</p>
        </footer>
    );
}

export default Footer;

const footerStyle = {
    marginTop: '80px',
    padding: '20px 0',
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
};
const footerTextStyle = {
    fontSize: '0.8rem',
    color: '#888',
    margin: '5px 0',
};
