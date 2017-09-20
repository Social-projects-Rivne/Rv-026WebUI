import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import _ from 'lodash';
import axios from 'axios';

import SearchBar from './SearchBar';
import DropDown from './DropDown';
import SearchElements from './SearchElements';

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            type: 'searchByName',
            item: '',
            itemNow: ''
        };

        this.typeChange = this.typeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSearchItemNow = this.onSearchItemNow.bind(this);
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
                    axios.post(`/api/recipes/search/name`, { item })
                        .then(response => { this.setState({ elements: response.data }) })
                        .catch(error => console.log(error));
                    break;
                case "searchByTagCategory":
                    axios.post(`/api/recipes/search/tagtype`, { item })
                        .then(response => { this.setState({ elements: response.data }) })
                        .catch(error => console.log(error));
                    break;
                default:
                    this.setState({ elements: [] });
            }
            this.setState({ item });
        } else {
            this.setState({ elements: [] });
            this.setState({ item: '' })
        }

    }

    typeChange(type) {
        this.setState({ type });
        this.setState({ elements: [] });
    }

    onSearchItemNow(itemNow) {
        this.setState({ itemNow });
    }

    onSubmit(e) {
        e.preventDefault();
        var itemNow = this.state.itemNow;
        var type = this.state.type;

        if (!itemNow || !type) {
            return;
        }

        if (type === 'searchByName') {
            browserHistory.push(`/recipes/search/name=${itemNow}`);
        } else if (type === 'searchByTagCategory') {
            browserHistory.push(`/recipes/search/tagtype=${itemNow}`);
        }

        this.setState({ elements: [] });

    }

    render() {
        const elementSearchDelay = _.debounce((item) => { this.elementSearch(item) }, 300);
        return (
            <section className="search-section">
                <h1 className="search-title">Welcome! Whanna Chew?</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.onSubmit}>
                            <div className="input-group header-search-group">
                                <DropDown onSearchTypeChange={this.typeChange} />
                                <SearchBar onSearchItemNow={this.onSearchItemNow} onSearchItemChange={elementSearchDelay} />
                                <span className="input-group-btn">
                                    <button type="submit" className="btn btn-primary">Go!</button>
                                </span>
                            </div>
                        </form>
                        <SearchElements allElements={this.state.elements} />
                    </div>
                </div>
            </section>
        );
    }
}

SearchComponent.propTypes = {
    getRecipes: PropTypes.func
};

export default SearchComponent;