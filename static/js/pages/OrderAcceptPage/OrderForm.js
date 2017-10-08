import React, { Component } from 'react';
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
            items: JSON.parse(localStorage.getItem('cart')),
        };
        this.onCommentChange = this.onCommentChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const comment = this.state.comment;
        console.log(this.state.items);
        const items = this.state.items;
        const orderContext = [];
        for (let i = 0; i < items.length; i += 1) {
            orderContext[i] = {
                id: items[i].id,
                count: items[i].count,
            };
        }
        this.props.handleSubmit({
            comment,
            orderContext,
        });
    }
    onCommentChange(e) {
        this.setState({ comment: e.target.value });
    }
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
                        <Button type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            );
        }
    }

}

export default OrderForm;
