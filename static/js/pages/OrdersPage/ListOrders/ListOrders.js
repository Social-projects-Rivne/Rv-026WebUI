import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrderItem from './OrderItem';

class ListOrders extends Component {
    render() {
        const { orders, orderOwnerCookId } = this.props;
        const orderList = orders.map((order) => {
            return <OrderItem onStatusSubmit={this.props.onStatusSubmit} key={order.id} order={order} orderOwnerCookId={orderOwnerCookId} />;
        });

        return (
            <div className="orders">
                <div className="orders-flexbox-table">
                    <div className="cell">#</div>
                    <div className="cell">Owner</div>
                    <div className="cell">Status</div>
                    <div className="cell">Dishes</div>
                    <div className="cell">Prices</div>
                    <div className="cell">Change Status</div>
                    <div className="cell">Comment</div>
                </div>
                {orderList}
            </div>
        );
    }
}

ListOrders.PropTypes = {
    order: PropTypes.array,
    onStatusSubmit: PropTypes.func,
    orderOwnerCookId: PropTypes.number,
};

export default ListOrders;
