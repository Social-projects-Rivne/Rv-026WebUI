import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Button, ButtonGroup, ButtonToolbar, Navbar, NavbarBrand, Collapse, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


/*const navBar = {
    paddingBottom: '10px'
}

const logo = {
    display: 'inline-block'
}*/

const mainMenu = {
}


class Header extends Component {
    render(){
        return(

            /*<ButtonToolbar style={navBar}>
               <ButtonGroup bsSize="large">
                    <Button>About Us</Button>
                    <Button>Order Now!</Button>
                    <Button>Recipes</Button>
                    <Button>How it works</Button>
                    <Button>Our services</Button>
                    <Button>Prices</Button>
                    <Button>Contact Us</Button>
                </ButtonGroup>
            </ButtonToolbar>*/

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
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">Login</NavItem>
                        <NavItem eventKey={2} href="#">Premium account</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

ReactDOM.render(<Header />, document.getElementById('nav'));

