import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class AddToCartButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        let orderList = [];
        orderList[0] = localStorage.getItem('cart');
        orderList.push(JSON.stringify(this.props.recipe.recipe.id));
        localStorage.setItem('cart', orderList);
        console.log(localStorage.getItem('cart')); 
    }
    render() {
        return (
            <Button 
                onClick={this.onClick}
                className="btn-create"
                bsStyle="info"
            >
            Add to cart
            </Button>
        );
    }
}
export default AddToCartButton;
