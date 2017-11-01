import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AlertContainer from 'react-alert';
import axios from 'axios';

import Header from '../../common/Header';
import OrderForm from './OrderForm';

class OrderAcceptPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    alertOptions = {
        offset: 18,
        position: 'top right',
        marginTop: '20%',
        theme: 'light',
        time: 1500,
        transition: 'fade',
        type: 'success',
    }

    handleSubmit(order) {
        const data = new FormData();
        for (const key in order) {
            if (hasOwnProperty.call(order, key)) {
                data.append(key, order[key]);
            }
        }
        console.log(data);
        axios.post('/api/order', data)
        .then(() => localStorage.clear())
        .then(res => this.msg.success('your order added!', { type: 'success' }))
        .then(setTimeout(() => browserHistory.push('/recipes'), 2000))
        .catch(err => this.msg.show('something go wrong!', { type: 'success' }));
    }
    render() {
        return (
            <div>
                <Header />
                <OrderForm handleSubmit={this.handleSubmit} />
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </div>

        );
    }
}

export default OrderAcceptPage;
