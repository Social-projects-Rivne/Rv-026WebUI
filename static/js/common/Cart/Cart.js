import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import CartItem from './CartItem';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
        };
        this.onClick = this.onClick.bind(this);
    }
    componentWillMount() {
        let items = [];
        items = JSON.parse(localStorage.getItem('cart'));
        this.setState({ cart: items });
    }
    onClick() {
        location.href = 'orders/new';
    }

    render() {
        const items = this.state.cart;
        if (items) {
            const orderList = items.map((item, index) => {
                return (<CartItem key={index} item={item} />);
            });
            return (
                <div className="Cart">
                    <div >{ orderList } </div>
                    <Button
                        onClick={this.onClick}
                        className="MakeOrderButton btn-create"
                    >
                        Make order!
                    </Button>
                </div>
            );
        } else {
            return (
                <div className="Cart">Cart is empty. Please first choose some dishes to order.</div>
            );
        }
    }
}
export default Cart;
