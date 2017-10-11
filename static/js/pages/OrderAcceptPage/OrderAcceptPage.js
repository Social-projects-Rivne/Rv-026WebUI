import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

import Header from '../../common/Header';
import OrderForm from './OrderForm';

class OrderAcceptPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(order) {
        const data = new FormData();
        for (const key in order) {
            if (hasOwnProperty.call(order, key)) {
                data.append(key, order[key]);
            }
        }
        console.log(data);
        axios.post('/api/addOrder', data)
        .then(() => localStorage.clear())
        .then(setTimeout(() => browserHistory.push('/recipes'), 500))
        .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <Header />
                <OrderForm handleSubmit={this.handleSubmit} />
            </div>

        );
    }
}

export default OrderAcceptPage;
