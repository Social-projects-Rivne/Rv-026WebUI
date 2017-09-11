import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';

import SearchBar from './SearchBar';
import SearchElements from './SearchElements';

import config from '../../../../config';

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
        //this is a test axios with the wrong link  
        //to check the output of the recipes from database
        console.log(this.state.elements);
        axios.get(`${config.serverUrl}/api/recipes`, {
            item
        })
        .then(response => this.setState({elements: response.data}))
        .catch(error => console.log(error));
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