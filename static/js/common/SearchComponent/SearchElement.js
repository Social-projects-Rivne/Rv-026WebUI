import React, { Component } from 'react';
import { browserHistory } from 'react-router';


class SearchElement extends Component {
    constructor(props) {
        super(props);
    }

    onClick(recipeId) {
        browserHistory.push(`/recipe/${recipeId}`);
    }

    render() {
        const element = this.props.element;
        return (
            <div key={element.id} className="search-element" onClick={() => this.onClick(element.id)}>
                <img className="image" src={element.photo} />
                <div className="text">
                    <p>{element.title}</p>
                    <p>Рейтинг:{element.rating}</p>
                </div>
            </div>
        );
    }
}

export default SearchElement;