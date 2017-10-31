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
        this.onClick1 = this.onClick1.bind(this);
        this.onClick2 = this.onClick2.bind(this);
    }

    onClick1() {
        browserHistory.push('/orders/new');
        this.props.hideCart(this.props.state.cart.status);
    }
    onClick2() {
        this.props.hideCart(this.props.state.cart.status);
    }

    render() {
        const items = this.props.state.cart.all;
        if (items.length > 0) {
            const orderList = items.map((item, index) => {
                return (<CartItem key={index} item={item} />);
            });
            return (
                <div className="Cart">
                    <div >{ orderList } </div>
                    <Button
                        onClick={this.onClick1}
                        className="MakeOrderButton btn-create"
                    >
                        Make order!
                    </Button>
                    <Button
                        onClick={this.onClick2}
                        className="CloseCart"
                    >
                        X
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
