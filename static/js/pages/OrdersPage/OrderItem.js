import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';

import RecipesInOrder from './RecipesInOrder';

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

    render() {
        const { order } = this.props;
        const { order_id, recipes_id, order_price, recipes_title } = this.props.order;
        const recipesInOrder = this.createArrayObjectsFromArrays(order_id, recipes_id, order_price, recipes_title);
        return (
            <tr className="order-item" key={order.id}>
                <td>{order.id}</td>
                <td>
                    <Link to={`/profile/${order.owner_id}`}>{order.fullname}</Link>
                </td>
                <td>{order.cooker_id}</td>
                <td>{order.status}</td>
                <td>
                    <RecipesInOrder recipesInOrder={recipesInOrder} />
                </td>
                <td>
                    <button className="btn btn-success">
                        change status
                    </button>
                </td>
            </tr>
        );
    }
}

OrderItem.PropTypes = {
    order: PropTypes.object,
};

export default OrderItem;
