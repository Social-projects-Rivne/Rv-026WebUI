import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RecipeItem from './RecipeItem';

class Recipes extends Component {
    render() {
        const recipe = this.props.result.map((result) => {
            return <RecipeItem key={result.id} recipe={result} />;
        });
        return (
            <div className="grid">
                {recipe}
            </div>
        );
    }
}

Recipes.PropTypes = {
    result: PropTypes.array,
};

export default Recipes;
