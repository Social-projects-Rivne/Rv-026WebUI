import React, { Component } from 'react';

import Cart from './Cart';


class CartButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            show: false,
            status: false,
        };
    }
    onClick() {
        if (this.state.show) {
            this.setState({ show: false });
        } else {
            this.setState({ show: true });
        }
    }
    render() {
        if (this.state.show) {
            return (
                <div>
                    <button
                        onClick={this.onClick}
                        className="cartButton"
                    >
                    Cart
                    <img className="cartIcon" src="../../../public/images/icons/cart.png" alt="cart" />
                    </button>
                    <Cart show={this.state.show} />
                    <svg className="octicon-bell" viewBox="-1 -1 2 2">
                        <circle className="circle" cx="0" cy="0" r="1" />
                    </svg>
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

export default CartButton;
