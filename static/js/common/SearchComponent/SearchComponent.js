import React, { Component } from 'react';

import SearchBar from './SearchBar';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SearchBar />
            </div>
        );
    }
}

export default SearchComponent;