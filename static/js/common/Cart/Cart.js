import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import CartItem from './CartItem';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            interval:
                setInterval(() => {
                    this.setState({ cart: JSON.parse(localStorage.getItem('cart')) });
                    //console.log(this.state.cart);
                }, 500),
        };
        this.onClick = this.onClick.bind(this);
    }

    componentWillMount() {
        let items = [];
        items = JSON.parse(localStorage.getItem('cart'));
        this.setState({ cart: items });
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    onClick() {
        browserHistory.push('/orders/new');
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
