import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

const searchel = {
    marginTop: '-3px',
    position: 'relative',
    display: 'block',
    width: '400px',
    backgroundColor: '#9d9d9d',
    zIndex: 1
}

const image = {
    width: '100px',
    height: '80px',
}

const text = {
    marginLeft: '105px',
    marginTop: '-50px'
}

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
            <div key={element.id} className="search-element" style={searchel} onClick={() => this.onClick(element.id)}>
                <img style={image} src={element.photo} />
                <div style={text}>
                    <p>{element.title}</p>
                    <p>Рейтинг:{element.rating}</p>
                </div>
            </div>
        );
    }
}

SearchElement.PropTypes = {
    element: PropTypes.object
}

export default SearchElement;