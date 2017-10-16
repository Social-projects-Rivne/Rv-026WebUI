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
        const { order_id, recipes_id, recipes_title, count } = this.props.order;
        const recipesInOrder = createArrayObjectsFromArrays(order_id, recipes_id, recipes_title, count);
        return (
            <tr className="order-item" key={order.id}>
                <td>{order.id}</td>
                <td>
                    <Link to={`/user/${order.owner_id}`}>{order.fullname}</Link>
                </td>
                <td>
                    <RenderStatus orderStatus={order.status} />
                </td>
                <td>
                    <RecipesInOrder recipesInOrder={recipesInOrder} />
                </td>
                <td>
                    {order.price} {"\u20B4"}
                </td>
                <td>
                    <ChangeStatus onStatusSubmit={this.props.onStatusSubmit} role={role} orderId={order.id} status={order.status} />
                </td>
                <td>
                    {order.comment}
                </td>
            </tr>
        );
    }
}

OrderItem.PropTypes = {
    order: PropTypes.object,
    onStatusSubmit: PropTypes.func,
};

export default OrderItem;
