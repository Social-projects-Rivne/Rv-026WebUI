import React, { Component } from 'react';

const footer = {
    display: 'inline-block'
}

const footerWhole = {
    textAlign: 'center',
    backgroundColor: '#333',
    color: 'white',
    padding: '10px 0px 0px',
    position: 'absolute',
    bottom: '0px',
    width: '100%',

}

const footerLinks = {
    color:'white'
}

class Footer extends Component {
    render(){
        return(
            <footer style={footerWhole}>
                <ul style = {footer}>
                    <li><a style={footerLinks} href="/about">About us</a></li>
                    <li><a style={footerLinks} href="/order">Order now!</a></li>
                </ul>
                <ul style = {footer}>
                    <li><a style={footerLinks} href="/recipes">Recipes</a></li>
                    <li><a style={footerLinks} href="/services">Our services</a></li>
                </ul>
                <ul style = {footer}>
                    <li><a style={footerLinks} href="/contact">Contact Us</a></li>
                    <li><a style={footerLinks} href="/pricy_police">Pricy Police</a></li>
                </ul>
            </footer>
        );
    }
}

export default Footer;
