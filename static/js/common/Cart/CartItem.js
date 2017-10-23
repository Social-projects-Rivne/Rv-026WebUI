import React, { Component } from 'react';

class CartItem extends Component {
    constructor (props) {
        super(props);
    }


    render() {
        return (
            <div className="cartItem">
                <div className="cell">
                    <img className="cartItemImg" src={`${this.props.item.photo}`} alt="recipe photo" />
                </div>
                <div className="cell cartItemTitle">
                    {this.props.item.title}
                </div>
                <div className="cell cartItemCount">
                    X {this.props.item.count}
                </div>
            </div>
        );
    }
}

export default CartItem;
