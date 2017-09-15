import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';

import SearchBar from './SearchBar';
import SearchElements from './SearchElements';
import DropDown from './DropDown';

const searchcomp = {
    position: 'absolute'
}

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            type: '',
            item: ''
        };

        this.typeChange = this.typeChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {        
        if (prevState.type !== this.state.type) {
            this.elementSearch(this.state.item);
        }
    }

    elementSearch(item) {
        if (item) {
            switch (this.state.type) {
                case "searchByName":
                    axios.post(`/api/recipes/search`, { item })
                        .then(response => { this.setState({ elements: response.data }) })
                        .catch(error => console.log(error));
                    break;
                case "searchByTagCategory":
                    //test request which will be changed
                    axios.post(`/api/recipes/search`, { item })
                        .then(response => { this.setState({ elements: response.data }) })
                        .catch(error => console.log(error));
                    break;
                default:
                    this.setState({ elements: [] });
            }
            this.setState({ item });
        } else {
            this.setState({ elements: [] });
            this.setState({item:''})
        }

    }

    typeChange(type) {
        this.setState({ type });
        this.setState({ elements: [] });
    }

    render() {
        const elementSearchDelay = _.debounce((item) => { this.elementSearch(item) }, 300);
        return (
            <div>
                <SearchBar onSearchItemChange={elementSearchDelay} />
                <DropDown onSearchTypeChange={this.typeChange} />
                <SearchElements allElements={this.state.elements} />
            </div>
        );
    }
}

export default SearchComponent;