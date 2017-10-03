import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import HeaderCook from '../../common/HeaderCook';
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
                    <HeaderCook />
                    <ReactLoading style={centerDiv} type="bars" color="#444" height="70" width="20" />
                </div>
            );
        } else if (phase === 'fetched') {
            return (
                <div>
                    <HeaderCook />
                    <div className="container">
                        <ListOrders orders={orders} />
                    </div>
                </div>
            );
        } else if (phase === 'failedToFetch') {
            return (
                <div>
                    <HeaderCook />
                    <div>Failed to fetch data from server</div>
                </div>
            );
        }
        return true;
    }
}

export default OrdersPage;
