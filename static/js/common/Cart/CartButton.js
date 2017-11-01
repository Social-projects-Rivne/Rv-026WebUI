import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cart from './Cart';

import {
    cartInit,
    showCart,
    hideCart,
} from '../../actions/cartActions';

class CartButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    componentWillMount() {
        this.props.cartInit();
    }
    onClick() {
        if (this.props.state.cart.status) {
            this.props.hideCart(this.props.state.cart.status);
        } else {
            this.props.showCart(this.props.state.cart.status);
        }
    }
    render() {
        if (this.props.state.cart.status) {
            return (
                <div>
                    <button
                        onClick={this.onClick}
                        className="cartButton"
                    >
                    Cart
                    <img className="cartIcon" src="../../../public/images/icons/cart.png" alt="cart" />
                    </button>
                    <Cart />
                </div>
            );
        } else {
            return (
                <div>
                    <button
                        onClick={this.onClick}
                        className="cartButton"
                    >
                    Cart
                        <img className="cartIcon" src="../../../public/images/icons/cart.png" alt="cart" />
                    </button>
                </div>
            );
        }
    }
}
CartButton.PropTypes = {
    cartInit: PropTypes.func,
    showCart: PropTypes.func,
    hideCart: PropTypes.func,
};
function mapStateToProps(state) {
    return { state };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        cartInit,
        showCart,
        hideCart,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CartButton);

