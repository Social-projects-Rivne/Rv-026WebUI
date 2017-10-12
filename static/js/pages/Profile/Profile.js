import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import wait from '../../common/wait';
import Result from './Result';
import Header from '../../common/Header';
import constants from '../../common/constants';

class User extends Component {
    constructor() {
        super();
        this.state = { user: [], process: 'fetching' };
        this.onStatusSubmit = this.onStatusSubmit.bind(this);
    }

    componentWillMount() {
        wait(2000)
        .then(() => {
            this.getAllOrders();
        })
            .catch((err) => {
                this.setState({ process: 'failedToFetch' });
                console.log(err, 'Failed to get profile data');
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
        fetch('/api/user/', { method: 'GET', credentials: 'include' })
            .then(response => response.json(), this.setState({ process: 'fetched' }))
            .then(({ rows: user }) => this.setState({ user }));
    }

    render() {
        const user = this.state.user;
        const phase = this.state.process;
        if (phase === 'fetching') {
            return (
                <div>
                    <Header />
                    <ReactLoading style={constants.centerDiv} type="bars" color="#444" height="70" width="20" />
                </div>
            );
        } else if (phase === 'fetched') {
            return (
                <div>
                    <Header />
                    <Result result={user} onStatusSubmit={this.onStatusSubmit} />
                </div>
            );
        } else if (phase === 'failedToFetch') {
            return (
                <div>
                    <Header />
                    <h6>Failed to fetch your data :( </h6>
                </div>
            );
        }
    }
}

export default User;
