import React, { Component } from 'react';

class CartItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        console.log(this.props);
        return (
            <div className="cartItem">
                <img className="cartItemImg" src={`${this.props.item.photo}`} alt="recipe photo" />
                <p className="cartItemTitle">
                    {this.props.item.title}
                </p>
                <p className="cartItemCount">
                   X {this.props.item.count}
                </p>

            </div>
        );
    }
}

export default CartItem;
