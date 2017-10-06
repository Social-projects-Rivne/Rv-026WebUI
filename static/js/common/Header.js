import axios from 'axios';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Navbar } from 'react-bootstrap';

import CartButton from './Cart/CartButton';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false };
        this.renderLoginLogout = this.renderLoginLogout.bind(this);
    }

    componentWillMount() {
        if (document.cookie) {
            this.setState({ loggedIn: true });
        } else {
            this.setState({ loggedIn: false });
        }
    }


    handleClick(e) {
        e.preventDefault();
        axios.get('/api/logout')
            .then(res => {
                browserHistory.push('/');
            })
            .catch(err => {
                console.log(err.stack);
                console.log('Failed to log out');
            });
    }

    renderCreateRecipe() {
        if (document.cookie) {
            return (
                <li><a href="/recipes/new">Create Recipe</a></li>
            );
        }
        return (null);
    }

    renderLoginLogout() {
        if (document.cookie) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li><CartButton /></li>
                    <li><a href="/profile"><span className="glyphicon glyphicon-user" aria-hidden="true"> </span> Profile</a></li>
                    <li><a href="/api/logout">Log Out</a></li>
                    
                </ul>
            );
        }
        return (
            <ul className="nav navbar-nav navbar-right">
                <li><CartButton /></li>
                <li><a href="/signin">Log In</a></li>
                <li><a href="/signup">Sign Up</a></li>
            </ul>
        );
    }

    render() {
        return (
            <header>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">FM&D</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <ul className="nav navbar-nav">
                            <li><a href="/recipes">Recipes</a></li>
                            {this.renderCreateRecipe()};
                            <li><a href="/order">Order now</a></li>
                            <li><a href="/about">About Us</a></li>
                        </ul>
                        {this.renderLoginLogout()};
                      </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}

export default Header;
