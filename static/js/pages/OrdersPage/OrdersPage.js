import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import Header from '../../common/Header';
import ListOrders from '../../common/ListOrders';

import wait from '../../common/wait';

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

class OrdersPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: null,
            process: 'fetching',
        };
        this.onStatusSubmit = this.onStatusSubmit.bind(this);
    }

    componentWillMount() {
        wait(2000)
        .then(() => {
            this.getAllOrders();
        })
        .catch((err) => {
            this.setState({ process: 'failedToFetch' });
            console.log(err, 'Failed to get orders data');
        });
    }

    onStatusSubmit({ currentStatus, orderId }) {
        fetch(`/api/order/status/${orderId}/${currentStatus}`, { 
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then((res) => {
            if (res.status === 200) {
                wait(0)
                .then(() => {
                    this.getAllOrders();
                })
                .catch((err) => {
                    this.setState({ process: 'failedToFetch' });
                    console.log(err, 'Failed to get orders data');
                });
                console.log('good!');
            }
        });
    }

    getAllOrders() {
        axios.get('/api/orders')
        .then((res) => {
            this.setState({ process: 'fetched', orders: res.data });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const orders = this.state.orders;
        const phase = this.state.process;
        if (phase === 'fetching') {
            return (
                <div>
                    <Header />
                    <ReactLoading style={centerDiv} type="bars" color="#444" height="70" width="20" />
                </div>
            );
        } else if (phase === 'fetched') {
            return (
                <div>
                    <Header />
                    <div className="container">
                        <ListOrders onStatusSubmit={this.onStatusSubmit} orders={orders} />
                    </div>
                </div>
            );
        } else if (phase === 'failedToFetch') {
            return (
                <div>
                    <Header />
                    <div>Failed to fetch data from server</div>
                </div>
            );
        }
        return true;
    }
}

export default OrdersPage;
