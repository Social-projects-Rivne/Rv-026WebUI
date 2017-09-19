import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

class RecipeItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var recipe = this.props.recipe;
        var ids = recipe.tags_id;
        var tags_name = recipe.tags_name;
        var tags = [];

        for (var i = 0; i < ids.length; i++) {
            if (ids[i]) {
                tags.push(
                    <span key={i}>
                        <Link to={`/${ids[i]}/recipes`} className='badge card-tag'>{tags_name[i]}</Link>{'\u00A0'}
                    </span>);
            }
        }

        return (
            <div className="card">
                <img className="card-image" src={recipe.photo} alt={recipe.title} />
                <div className="card-text">
                    <h1 className="card-title">
                        {recipe.title}
                    </h1>
                    <p className="card-description">
                        {recipe.description}
                    </p>
                    <div>
                        {tags.length > 0 ? <p>{tags}</p> : null}
                    </div>
                    <p className="card-read-more">
                        <Link to={`/recipes/${recipe.id}`}>Read More >></Link>
                    </p>
                </div>
            </div>
        );

    }
}

RecipeItem.PropTypes = {
    recipe: PropTypes.object
};

export default RecipeItem;