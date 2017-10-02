import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

let orderList = [];

class AddToCartButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.item = this.props.item.recipe;
    }
    onClick() {
        if (localStorage.getItem('cart') === null) {
            orderList.push(this.item);
            localStorage.setItem('cart', JSON.stringify(orderList));
            console.log(orderList);
        } else {
            orderList = (JSON.parse(localStorage.getItem('cart')));
            orderList.push(this.item);
            localStorage.setItem('cart', JSON.stringify(orderList));
            console.log(orderList);
        }
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

AddToCartButton.PropTypes = {
    item: PropTypes.object,
};

export default AddToCartButton;
