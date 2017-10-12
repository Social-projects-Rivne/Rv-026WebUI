import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrderItem from './OrderItem';
import { ROLE_COOK, ROLE_USER } from '../../../../config';

class ListOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 'cook',
        };
    }

    renderThForRole() {
        if (this.state.role === ROLE_USER) {
            return (
                <th>Cooker</th>
            );
        } else if (this.state.role === ROLE_COOK) {
            return (
                <th>Owner</th>
            );
        }
        return (null);
    }

    renderThCookerWithoutRole() {
        if (!this.state.role) {
            return (
                <th>Cooker</th>
            );
        }
        return (null);
    }

    renderThUserWithoutRole() {
        if (!this.state.role) {
            return (
                <th>User</th>
            );
        }
        return (null);
    }

    render() {
        const role = this.state.role;
        const { orders } = this.props;
        const orderList = orders.map((order) => {
            return <OrderItem onStatusSubmit={this.props.onStatusSubmit} key={order.id} order={order} role={role} />;
        });

        return (
            <div className="table-responsive">
                <table className="table orders-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            {this.renderThForRole()}
                            {this.renderThCookerWithoutRole()}
                            {this.renderThUserWithoutRole()}
                            <th>Status</th>
                            <th>Dishes</th>
                            <th>Prices</th>
                            <th>Change Status</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList}
                    </tbody>
                </table>
            </div>
        );
    }
}

ListOrders.PropTypes = {
    order: PropTypes.array,
};

export default ListOrders;
