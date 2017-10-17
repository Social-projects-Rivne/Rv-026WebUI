import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class RecipesInOrder extends Component {
    render() {
        const { recipesInOrder } = this.props;
        const recipesInOrderList = recipesInOrder.map((item) => {
            return (
                <div className="orders-context-flexbox-table" key={item.order_contex_id}>
                    <div className="cell">
                        <Link to={`/recipes/${item.recipes_id}`}>{item.recipes_title}</Link>
                    </div>
                    <div className="cell">
                        Х {item.count}
                    </div>
                </div>
            );
        });
        return (
            <div>
                {recipesInOrderList}
            </div>
        );
    }
}

RecipesInOrder.PropTypes = {
    recipesInOrder: PropTypes.array,
};

export default RecipesInOrder;
