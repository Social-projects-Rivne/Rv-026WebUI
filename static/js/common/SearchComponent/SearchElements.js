import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchElement from './SearchElement';

const se = {
    position: 'absolute',
    top: '110px',
    widht: '100%'
}

class SearchElements extends Component {
    constructor(props) {
        super(props);
    }

    renderListSearchElements() {
        return this.props.allElements.map(element => {
            return (
                <SearchElement
                    key={element.id}
                    element={element}
                />
            );
        });
    }

    render() {
        return (
            <div style={se} className="search-elements">
                {this.renderListSearchElements()}
            </div>
        );
    }
}

SearchElements.PropTypes = {
    allElements: PropTypes.array
}


export default SearchElements;
