import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrderItem from './OrderItem';

class ListOrders extends Component {
    render() {
        const { orders } = this.props;
        const orderList = orders.map((order) => {
            return <OrderItem onStatusSubmit={this.props.onStatusSubmit} key={order.id} order={order} />;
        });

        return (
            <div className="table-responsive">
                <table className="table orders-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Owner</th>
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
    onStatusSubmit: PropTypes.func,
};

export default ListOrders;
