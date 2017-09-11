import React, { Component } from 'react';

import SearchBar from './SearchBar';
import SearchElements from './SearchElements';
const  searchcomp = {
    position: 'absolute'

} 
class SearchComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={searchcomp}>
                <SearchBar />
                <SearchElements />
            </div>
        );
    }
}

export default SearchComponent;