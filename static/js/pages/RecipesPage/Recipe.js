import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

import RecipeItem from './RecipeItem';

class Recipe extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var recipe = this.props.result.map(function (result, index) {
            return <RecipeItem key={index} recipe={result} />
        });
        return (
            <div>
                <div className="col-sm-12">
                    {recipe}
                </div>
            </div>
        );
    }
}

export default Recipe;