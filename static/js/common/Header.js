import axios from 'axios';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Navbar } from 'react-bootstrap';
import CartButton from './Cart/CartButton';
import { ROLE_COOK } from '../../../config';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: document.cookie };
        this.renderLoginLogout = this.renderLoginLogout.bind(this);
    }

    componentWillMount() {
        if (document.cookie) {
            this.setState({ loggedIn: document.cookie });
        } else {
            this.setState({ loggedIn: document.cookie });
        }
    }

    getCookie(name) {
        const nameReplace = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1');
        const matches = document.cookie.match(new RegExp(
          `(?:^|; )${nameReplace}=([^;]*)`,
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
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

    renderListOfJobs() {
        if (document.cookie && this.getCookie('role') === ROLE_COOK) {
            return (
                <li><a href="/orders">List of jobs</a></li>
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
                            {this.renderListOfJobs()};
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
