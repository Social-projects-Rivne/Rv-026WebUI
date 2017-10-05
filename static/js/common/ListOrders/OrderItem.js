import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';

import { ROLE_COOK, ROLE_USER } from '../../../../config';
import RecipesInOrder from './RecipesInOrder';
import ChangeStatus from './ChangeStatus';

class OrderItem extends Component {
    createArrayObjectsFromArrays(order_id, recipes_id, order_price, recipes_title) {
        const objects = [];
        for (let i = 0; i < recipes_id.length; i++) {
            objects.push(_.zipObject(
                ['order_id', 'recipes_id', 'order_price', 'recipes_title'],
                [order_id[i], recipes_id[i], order_price[i], recipes_title[i]],
            ));
        }
        return objects;
    }

    renderTdForRole(cooker_id, owner_id, fullname) {
        if (this.props.role === ROLE_USER) {
            return (
                <td>{cooker_id}</td>
            );
        } else if (this.props.role === ROLE_COOK) {
            return (
                <td>
                    <Link to={`/profile/${owner_id}`}>{fullname}</Link>
                </td>
            );
        }
        return (null);
    }

    renderTdCookerWithoutRole(cooker_id) {
        if (!this.props.role) {
            return (
                <td>{cooker_id}</td>
            );
        }
        return (null);
    }

    renderTdUserWithoutRole(owner_id, fullname) {
        if (!this.props.role) {
            return (
                <td>
                    <Link to={`/profile/${owner_id}`}>{fullname}</Link>
                </td>
            );
        }
        return (null);
    }

    render() {
        const { role } = this.props;
        const { order } = this.props;
        const { order_id, recipes_id, order_price, recipes_title } = this.props.order;
        const recipesInOrder = this.createArrayObjectsFromArrays(order_id, recipes_id, order_price, recipes_title);
        return (
            <tr className="order-item" key={order.id}>
                <td>{order.id}</td>
                {this.renderTdForRole(order.cooker_id, order.owner_id, order.fullname)}
                {this.renderTdCookerWithoutRole(order.cooker_id)}
                {this.renderTdUserWithoutRole(order.owner_id, order.fullname)}
                <td>{order.status}</td>
                <td>
                    <RecipesInOrder recipesInOrder={recipesInOrder} />
                </td>
                <td>
                    <ChangeStatus role={role} orderId={order.id} status={order.status} />
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
