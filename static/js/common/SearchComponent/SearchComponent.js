import React, { Component } from 'react';

import SearchBar from './SearchBar';
import SearchElements from './SearchElements';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SearchBar />
                <SearchElements />
            </div>
        );
    }
}

export default SearchComponent;