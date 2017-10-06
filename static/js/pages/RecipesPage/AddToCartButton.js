import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

let orderList = [];

class AddToCartButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.item = this.props.item.recipe;
        this.item.count = 1;
    }
    onClick() {
        if (!localStorage.getItem('cart')) {
            orderList.push(this.item);
            localStorage.setItem('cart', JSON.stringify(orderList));
        } else {
            orderList = (JSON.parse(localStorage.getItem('cart')));
            const found = orderList.find((value, index) => {
                if (value.id === this.item.id) {
                    orderList[index].count += 1;
                    return true;
                }
                return false;
            });
            if (!found) {
                orderList.push(this.item);
            }
            console.log(orderList);
            localStorage.setItem('cart', JSON.stringify(orderList));
        }
    }
    render() {
        return (
            <Button
                onClick={this.onClick}
                className="btn-create AddToCartButton"
            >
            Add to cart {'\u2795'}
            </Button>
        );
    }
}

AddToCartButton.PropTypes = {
    item: PropTypes.object,
};

export default AddToCartButton;
