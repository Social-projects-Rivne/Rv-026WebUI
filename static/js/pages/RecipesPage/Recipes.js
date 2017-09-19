import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import RecipeItem from './RecipeItem';

class Recipes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var recipe = this.props.result.map(function (result, index) {
            return <RecipeItem key={index} recipe={result} />
        });
        return (
            <div className="grid">
                {recipe}
            </div>
        );
    }
}

Recipes.PropTypes = {
    result: PropTypes.array
};

export default Recipes;