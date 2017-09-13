import axios from 'axios';
import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    MenuItem
} from 'react-bootstrap';



class Header extends Component {
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
                            <NavItem componentClass="span">
                                <Link className='btn btn-default' to="/recipes">Recipes</Link>
                            </NavItem>
                            <NavItem componentClass="span">Order now</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem componentClass="span">
                                <Link className='btn btn-default' to="/signin">Login</Link>
                            </NavItem>
                            <NavItem componentClass="span">
                                <Link className='btn btn-default' to="/signup">Sign up</Link>
                            </NavItem>
                            <NavItem href="#">Premium account</NavItem>
                            <NavItem componentClass="span" >
                                <Link className='btn btn-default' onClick={this.handleClick}>Log out</Link>
                            </NavItem>
                           
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </header>
        );
    }
}

export default Header;
