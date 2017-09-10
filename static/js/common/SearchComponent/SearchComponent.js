import React, { Component } from 'react';
import _ from 'lodash';

import SearchBar from './SearchBar';
import SearchElements from './SearchElements';

import testData from './testData';

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: []
        };

        //this.elementSearch('');

    }

    elementSearch(item){
        this.setState({elements: testData});
        console.log(this.state.elements);
    }

    render() {
        const elementSearch = _.debounce(item => { this.elementSearch(item) }, 300 );
        return (
            <div>
                <SearchBar onSearchItemChange={elementSearch} />
                <SearchElements allElements={this.state.elements} />
            </div>
        );
    }
}

export default SearchComponent;