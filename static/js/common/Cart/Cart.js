import React, { Component } from 'react';

import CartItem from './CartItem';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
        };
    }
    componentWillMount() {
        let items = [];
        items = JSON.parse(localStorage.getItem('cart'));
        console.log(items);
        this.setState({ cart: items });
    }

    render() {
        const items = this.state.cart;
        console.log(this.state.cart);
        if (items) {
            const orderList = items.map((item, index) => {
                return (<CartItem key={index} item={item} />);
            });
            return (
                <div className="Cart">{ orderList } </div>
            );
        } else {
            return (
                <div className="Cart">Cart is empty</div>
            );
        }
    }
}
export default Cart;
