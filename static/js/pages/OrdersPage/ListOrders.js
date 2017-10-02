import React, { Component } from 'react';

import OrderItem from './OrderItem';

class ListOrders extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const orders = this.props.orders;
        const orderList = orders.map((order) => {
            return <OrderItem key={order.id} order={order} />;
        });
        return (
            <div className="table-responsive">
                <table className="table orders-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Owner</th>
                            <th>Cooker</th>
                            <th>Status</th>
                            <th>Dishes</th>
                            <th>Change Status</th>
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

export default ListOrders;
