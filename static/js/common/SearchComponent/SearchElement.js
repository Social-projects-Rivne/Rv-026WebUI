import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import SearchElementRating from './SearchElementRating';

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
                    <p className="title">{element.title}</p>
                    <p className="author">Автор: {element.fullname}</p>
                   
                </div>
                
                <SearchElementRating stars={element.rating}/>
            </div>
        );
    }
}

export default SearchElement;