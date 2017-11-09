import React, { Component } from 'react';

const footer = {
    display: 'inline-block',
};

const footerWhole = {
    textAlign: 'center',
    backgroundColor: '#333',
    color: 'white',
    padding: '17px 0px 15px 0px',
    position: 'absolute',
    bottom: '0px',
    width: '100%',
};

const footerLinks = {
    color: 'white',
};

class Footer extends Component {
    render() {
        return (
            <footer style={footerWhole}>
                <ul style={footer}>
                    <li><a style={footerLinks} href="/">Home</a></li>
                </ul>
                <ul style={footer}>
                    <li><a style={footerLinks} href="/recipes">Recipes</a></li>
                </ul>
                <ul style={footer}>
                    <li><a style={footerLinks} href="/about">About us</a></li>
                </ul>
            </footer>
        );
    }
}

export default Footer;
