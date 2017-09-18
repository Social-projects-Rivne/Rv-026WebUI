import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            item: ''
        };

        this.typeChange = this.typeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onSubmit(e) {
        e.preventDefault();
        var item = this.state.item;
        var type = this.state.type;
        var elements = this.state.elements;
        if (!item || !type) {
            return;
        }
        this.props.getRecipes(elements);
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
                                <SearchBar onSearchItemChange={elementSearchDelay} />
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