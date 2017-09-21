import React, { Component } from 'react';

const footer = {
    display: 'inline-block'
}

const footerWhole = {
    position: 'relative',
    left: '0',
    bottom: '0',
    width: '100%',
    padding:'10px',
    textAlign: 'center',
    backgroundColor: '#333',
    color: 'white'
}

const footerLinks = {
    color:'white'
}

class Footer extends Component {
    render(){
        return(
            <footer style={footerWhole}>
                <ul style = {footer}>
                    <li><a style={footerLinks} href="#">About us</a></li>
                    <li><a style={footerLinks} href="#">Order now!</a></li>
                </ul>
                <ul style = {footer}>
                    <li><a style={footerLinks} href="#">Recipes</a></li>
                    <li><a style={footerLinks} href="#">How it works</a></li>
                </ul>
                <ul style = {footer}>
                    <li><a style={footerLinks} href="#">Our services</a></li>
                    <li><a style={footerLinks} href="#">Prices</a></li>
                </ul>
                <ul style = {footer}>
                    <li><a style={footerLinks} href="#">Contact Us</a></li>
                    <li><a style={footerLinks} href="#">Pricy Police</a></li>
                </ul>
            </footer>
        );
    }
}

export default Footer;