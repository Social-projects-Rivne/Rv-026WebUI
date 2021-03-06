import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    addItem,
} from '../../actions/cartActions';

class AddToCartButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.item = this.props.item.recipe;
        this.item.count = 1;
    }
    onClick() {
        /*let orderList = [];
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
            localStorage.setItem('cart', JSON.stringify(orderList));
        }*/
        this.props.addItem(this.item);
    }
    render() {
        return (
            <Button
                onClick={this.onClick}
                className="btn-create AddToCartButton"
            >
            Add to cart
            <div className="plus-symbol spin">{'\u2795'}</div>
            </Button>
        );
    }
}

AddToCartButton.PropTypes = {
    item: PropTypes.object,
    addItem: PropTypes.func,
};

function mapStateToProps(state) {
    return { state };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addItem,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton);
