import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class RecipesInOrder extends Component {
    render() {
        const { recipesInOrder } = this.props;
        const recipesInOrderList = recipesInOrder.map((item) => {
            return (
                <div key={item.order_id} className="recipe-block" >
                    <p className="recipes-in-order">
                        <Link to={`/recipes/${item.recipes_id}`}>{item.recipes_title}</Link>
                    </p>
                    <p className="recipes-in-order">
                        Х {item.count}
                    </p>
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
