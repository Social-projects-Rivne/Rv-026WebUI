import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartItem from './CartItem';

import {
    showCart,
    hideCart,
} from '../../actions/cartActions';

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
        items = this.props.state.cart.all;
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    onClick() {
        browserHistory.push('/orders/new');
    }

    render() {
        const items = this.props.state.cart.all;
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
function mapStateToProps(state) {
    return { state };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showCart,
        hideCart,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
