import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class AddToCartButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        console.log(this.props);
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
