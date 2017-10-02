import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import AddToCartButton from './AddToCartButton';

class RecipeItem extends Component {
    render() {
        const recipe = this.props.recipe;
        const ids = recipe.tags_id;
        const tagsName = recipe.tags_name;
        const tags = [];

        for (let i = 0; i < ids.length; i++) {
            if (ids[i]) {
                tags.push(
                    <span key={i}>
                        <Link to={`/${ids[i]}/recipes`} className="badge card-tag">{tagsName[i]}</Link>{'\u00A0'}
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
                        <AddToCartButton item={this.props} />
                        <Link to={`/recipes/${recipe.id}`}>Read More </Link>
                    </p>
                </div>
            </div>
        );
    }
}

RecipeItem.PropTypes = {
    recipe: PropTypes.object,
};

export default RecipeItem;
