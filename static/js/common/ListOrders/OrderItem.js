import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';

import { ROLE_COOK, ROLE_USER } from '../../../../config';
import RecipesInOrder from './RecipesInOrder';
import ChangeStatus from '../ChangeStatus';

import switchColorToElement from '../switchColorToElement';

class OrderItem extends Component {
    createArrayObjectsFromArrays(order_id, recipes_id, recipes_title, count) {
        const objects = [];
        for (let i = 0; i < recipes_id.length; i++) {
            objects.push(_.zipObject(
                ['order_id', 'recipes_id', 'recipes_title', 'count'],
                [order_id[i], recipes_id[i], recipes_title[i], count[i]],
            ));
        }
        return objects;
    }

    renderStatus(orderStatus) {
        const color = switchColorToElement(orderStatus);
        if (color) {
            return <span className="label label-status" style={{ backgroundColor: color }}>{orderStatus}</span>;
        }
        return (null);
    }

    render() {
        const { role } = this.props;
        const { order } = this.props;
        const { order_id, recipes_id, recipes_title, count } = this.props.order;
        const recipesInOrder = this.createArrayObjectsFromArrays(order_id, recipes_id, recipes_title, count);
        return (
            <tr className="order-item" key={order.id}>
                <td>{order.id}</td>
                <td>
                    <Link to={`/user/${order.owner_id}`}>{order.fullname}</Link>
                </td>
                <td>
                    {this.renderStatus(order.status)}
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
    role: PropTypes.string,
};

export default OrderItem;
