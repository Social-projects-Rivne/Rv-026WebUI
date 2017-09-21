import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import axios from 'axios';
import ReactLoading from 'react-loading';

import SearchBar from './SearchBar';
import DropDown from './DropDown';
import SearchElements from './SearchElements';

import wait from '../../../common/wait';

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            type: 'searchByName',
            item: '',
            itemNow: '',
            process: '',
        };

        this.typeChange = this.typeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSearchItemNow = this.onSearchItemNow.bind(this);
        this.elementSearch = this.elementSearch.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.item !== this.state.item && this.state.item) {
            this.setState({ process: 'fetching' });
        }
        
        if (prevState.type !== this.state.type) {
            this.setState({ process: 'fetching' });
            this.elementSearch(this.state.item);
        }
    }

    onSearchItemNow(itemNow) {
        this.setState({ itemNow });
    }

    onSubmit(e) {
        e.preventDefault();
        const itemNow = this.state.itemNow;
        const type = this.state.type;

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

    elementSearch(item) {
        this.setState({ item });
        if (item) {
            switch (this.state.type) {
            case 'searchByName':
                wait(1000)
                .then(() => {
                    axios.post('/api/recipes/search/name', { item })
                        .then(response => this.setState({ process: 'fetched', elements: response.data }))
                        .catch(error => console.log(error));
                })
                .catch((err) => {
                    this.setState({ process: 'failedToFetch' });
                    console.log(err, 'Failed to get recipes data');
                });
                break;
            case 'searchByTagCategory':
                wait(1000)
                .then(() => {
                    axios.post('/api/recipes/search/tagtype', { item })
                        .then(response => this.setState({ process: 'fetched', elements: response.data }))
                        .catch(error => console.log(error));
                })
                .catch((err) => {
                    this.setState({ process: 'failedToFetch' });
                    console.log(err, 'Failed to get recipes data');
                });
                break;
            default:
                this.setState({ elements: [] });
            }
        } else {
            this.setState({ item: '' });
            this.setState({ elements: [] });
            this.setState({ process: '' });
        }
    }

    typeChange(type) {
        this.setState({ type });
        this.setState({ elements: [] });
    }

    render() {
        const phase = this.state.process;
        let searchElement = null;
        if (phase === 'fetching') {
            searchElement = <ReactLoading style={centerDiv} type="bars" color="#444" height="70" width="20" />;
        } else if (phase === 'fetched') {
            searchElement = <SearchElements allElements={this.state.elements} />;
        }

        return (
            <section className="search-section">
                <h1 className="search-title">Welcome! Whanna Chew?</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.onSubmit}>
                            <div className="input-group header-search-group">
                                <DropDown onSearchTypeChange={this.typeChange} />
                                <SearchBar onSearchItemNow={this.onSearchItemNow} onSearchItemChange={this.elementSearch} />
                                <span className="input-group-btn">
                                    <button type="submit" className="btn btn-primary">Go!</button>
                                </span>
                            </div>
                        </form>
                        {searchElement}
                    </div>
                </div>
            </section>
        );
    }
}

SearchComponent.propTypes = {
    getRecipes: PropTypes.func,
};

export default SearchComponent;
