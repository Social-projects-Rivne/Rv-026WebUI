import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {
    Button,
    ControlLabel,
    FormControl,
    FormGroup,
} from 'react-bootstrap';
import axios from 'axios';


import CartItem from '../../common/Cart/CartItem';

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            price: '',
            items: JSON.parse(localStorage.getItem('cart')),
           
            emptyPrice: '',

            buttonDisabledPrice: true,
        };
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const comment = this.state.comment;
        const price = this.state.price;
        const items = this.state.items;
        let orderContext = [];
        for (let i = 0; i < items.length; i += 1) {
            orderContext[i] = {
                id: items[i].id,
                count: items[i].count,
            };
        }
        orderContext = JSON.stringify(orderContext);
        this.props.handleSubmit({
            price,
            comment,
            orderContext,
        });
    }
    onClick() {
        localStorage.removeItem('cart');
        browserHistory.push('/recipes');
    }
    onPriceChange(e) {
        this.setState({ price: e.target.value });
        this.setState({ buttonDisabledPrice: !e.target.value });
        this.emptyValidate(e.target.value, 'emptyPrice', 'Price is Required');
    }
    onCommentChange(e) {
        this.setState({ comment: e.target.value });
    }


    emptyValidate(value, emptyField, emptyMessage) {
        if (_.isEmpty(value)) {
            this.setState({ [emptyField]: [emptyMessage] });
        } else {
            this.setState({ [emptyField]: null });
        }
    }

    errorMessage = (m) => m === null ? '' : <div className="text-danger">{m}</div>;

    render() {
        if (this.state.items) {
            const orderList = this.state.items.map((item, index) => {
                return (
                    <CartItem key={index} item={item} />
                );
            });
            return (
                <div className="order-form">
                    <form
                        className="accept-order-form"
                        onSubmit={this.onSubmit}
                    >
                        <h1 className="title">Is your order right?</h1>
                        <FormGroup>
                            <div className="order-list"> { orderList }</div>
                            <div className="label">
                                <p>
                                    Price*
                                </p>
                            </div>
                            <FormControl
                                className="price"
                                type="number"
                                name="price"
                                id="Order-Form--price"
                                placeholder="Price"
                                value={this.state.price}
                                onChange={this.onPriceChange}
                            />
                            <p>{'\u20B4'}</p>
                            {this.errorMessage(this.state.emptyPrice)}
                        </FormGroup>
                            
                        <FormGroup>
                            <label htmlFor="RecipesForm--comment">Comment</label>
                            <FormControl
                                componentClass="textarea"
                                name="comment"
                                id="OrderForm--comment"
                                placeholder="Comment to your order"
                                value={this.state.comment}
                                onChange={this.onCommentChange}
                            />
                            
                        </FormGroup>
                        <Button
                            type="submit"
                            disabled={
                            this.state.buttonDisabledPrice}
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={this.onClick}
                        >
                            Cancel
                        </Button>
                    </form>
                </div>
            );
        }
    }

}

export default OrderForm;
