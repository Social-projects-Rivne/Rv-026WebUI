import axios from 'axios';
import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import {Button, Form, FormGroup, FormControl, ButtonGroup, ButtonToolbar, Navbar, NavbarBrand, Collapse, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = { loggedIn: false};

        this.renderLoginLogout = this.renderLoginLogout.bind(this);
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

    componentWillMount() {
        if (document.cookie) {
            this.setState({ loggedIn: true });
        } else {
            this.setState({ loggedIn: false });
        }
    }
    renderLoginLogout() {
        if (this.state.loggedIn) {
            return (
                <ul className="nav navbar-nav navbar-right">
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
                            <a href="#">Foodmake.com</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">About Us</NavItem>
                            <NavItem eventKey={2} href="#">How it works</NavItem>
                            <NavItem eventKey={3} href="#">Recipes</NavItem>
                            <NavItem eventKey={4} href="#">Order now</NavItem>
                            <NavDropdown eventKey={5} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={5.1}>Action</MenuItem>
                                <MenuItem eventKey={5.2}>Another action</MenuItem>
                                <MenuItem eventKey={5.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={5.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>

                        {this.renderLoginLogout()};
                    </Navbar.Collapse>
                </Navbar>


            </header>
        );
    }
}

export default Header;
