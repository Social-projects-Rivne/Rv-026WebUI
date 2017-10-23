import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import RecipesInOrder from './RecipesInOrder';
import ChangeStatus from '../../../common/ChangeStatus';
import RenderStatus from '../../../common/OrderHelpers/RenderStatus';
import createArrayObjectsFromArrays from '../../../common/OrderHelpers/createArrayObjectsFromArrays';
import { ROLE_COOK } from '../../../../../config';

class OrderItem extends Component {
    render() {
        const role = ROLE_COOK;
        const { order } = this.props;
        const { order_contex_id, recipes_id, recipes_title, count } = this.props.order;
        const recipesInOrder = createArrayObjectsFromArrays(order_contex_id, recipes_id, recipes_title, count);
        return (
            <div className="orders-flexbox-table" key={order.id}>
                <div className="cell">{order.id}</div>
                <div className="cell">
                    <Link to={`/user/${order.owner_id}`}>{order.fullname}</Link>
                </div>
                <div className="cell">
                    <RenderStatus orderStatus={order.status} />
                </div>
                <div className="cell">
                    <RecipesInOrder recipesInOrder={recipesInOrder} />
                </div>
                <div className="cell">
                    {order.price} {"\u20B4"}
                </div>
                <div className="cell">
                    <ChangeStatus onStatusSubmit={this.props.onStatusSubmit} role={role} orderId={order.id} status={order.status} />
                </div>
                <div className="cell">
                    {order.comment}
                </div>
            </div>
        );
    }
}

OrderItem.PropTypes = {
    order: PropTypes.object,
    onStatusSubmit: PropTypes.func,
};

export default OrderItem;
