import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import ChangeStatus from '../../../common/ListOrders/ChangeStatus';
import wait from '../../../common/wait';

class Result extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.role_id;
        this.userId = this.props.id;
        this.state = {
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
        axios.get(`/api/user/${this.userId}/role/${this.role_id}/orders/`)
        .then((res) => {
            this.setState({ process: 'fetched', profile: res.data });
        }).catch((error) => {
            console.log(error);
        });
    }



    render() {
        let role;
        if(this.id === 2) {
          role = 'user';
        } else if (this.id === 3) {
          role = 'cook'
        }

        console.log(this.props.result);
        console.log(this.status_id);
        const ordersList =  this.props.result.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    {this.id === 2 ? <td>
                        <Link to={`/user/${item.cooker_id}`}>{!item.fullname ? (item.email.split('@')[0]) : item.fullname }</Link></td>
                      :  this.id === 3 ? <td>
                        <Link to={`/user/${item.user_id}`}>{!item.fullname ? (item.email.split('@')[0]) : item.fullname }</Link></td> : <span><td>{item.cooker_id}</td><td>{item.fullname}</td></span> }
                    <td>{item.status}</td>
                    <td><Link to={`/recipes/${item.recipe_id}`}>{item.title}</Link></td>
                    <td>{item.price}</td>
                    <td><ChangeStatus orderId={item.order_id} status={item.status} role={role} onStatusSubmit={this.onStatusSubmit} /></td>
                </tr>
            );
        });



        return (
            <div className="table-responsive">
                <table className="table orders-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            {this.id === 2 ? <th>Cooker</th> :  this.id === 3 ? <th>Client</th> : <span><th>Cooker</th><th>Owner</th></span> }
                            <th>Status</th>
                            <th>Dishes</th>
                            <th>Price</th>
                            <th>Change status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Result;
