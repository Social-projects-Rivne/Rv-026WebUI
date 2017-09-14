import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';

import SearchBar from './SearchBar';
import SearchElements from './SearchElements';
import DropDown from './DropDown';

import config from '../../../../config';

const searchcomp = {
    position: 'absolute'
}

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: []
        };

        this.elementSearch('');

    }

    elementSearch(item) {
        if (item) {
            axios.post(`${config.serverUrl}/api/recipes/search`, { item })
                .then(response => { console.log(response); this.setState({ elements: response.data }) })
                .catch(error => console.log(error));
        } else {
            this.setState({ elements: [] });
        }
    }

    render() {
        const elementSearch = _.debounce(item => { this.elementSearch(item) }, 300);
        return (

            <div>
                <SearchBar onSearchItemChange={elementSearch} />
                <DropDown />
                <SearchElements allElements={this.state.elements} />
            </div>
        );
    }
}

export default SearchComponent;