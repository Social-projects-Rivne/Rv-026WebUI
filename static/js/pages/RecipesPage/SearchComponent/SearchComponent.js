import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import axios from 'axios';
import ReactLoading from 'react-loading';

import MultiSelect from './MultiSelect/MultiSelect';
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
            selectedOptions: [], // selected options' ids from MultiSelect form
            fetchedIngredients: [], // ingredient list after fetching from server
        };

        this.typeChange = this.typeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSearchItemNow = this.onSearchItemNow.bind(this);
        this.elementSearch = this.elementSearch.bind(this);
        this.onMultiSelectChange = this.onMultiSelectChange.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.item !== this.state.item && this.state.item) {
            this.setState({ process: 'fetching' });
        }

        if (prevState.type !== this.state.type && this.state.type === 'searchByIngredients') {
            axios.get('/api/recipes/getAllIngredients')
            .then((response) => {
                const sortedData = response.data.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
                this.setState({ fetchedIngredients: sortedData });
            })
            .catch(error => console.log(error));
            return;
        }

        if (prevState.type !== this.state.type) {
            this.setState({ process: 'fetching' });
            this.elementSearch(this.state.item);
        }
    }

    onMultiSelectChange(arr) {
        this.setState({ selectedOptions: arr });
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

    requestToSearch(item, searchParam) {
        wait(200)
        .then(() => {
            axios.get(`/api/recipes/autocomplete?item=${item}&&searchparam=${searchParam}`)
                .then(response => this.setState({ process: 'fetched', elements: response.data }))
                .catch(error => console.log(error));
        })
        .catch((err) => {
            this.setState({ process: 'failedToFetch' });
            console.log(err, 'Failed to get recipes data');
        });
    }

    elementSearch(item) {
        this.setState({ item });
        if (item) {
            switch (this.state.type) {
            case 'searchByName':
                this.requestToSearch(item, 'name');
                break;
            case 'searchByTagCategory':
                this.requestToSearch(item, 'tagtype');
                break;
            default:
                this.setState({ item: '', elements: [], process: 'fetched' });
            }
        } else {
            this.setState({ item: '', elements: [], process: '' });
        }
    }

    typeChange(type) {
        this.setState({ type, elements: [] });
    }

    handleSearchButtonClick() {
        browserHistory.push(`/recipes/search/ingredients=${this.state.selectedOptions.join(',')}`);
    }

    render() {
        const phase = this.state.process;
        const type = this.state.type;
        let searchElement = null;
        let inputSearch = null;
        if (phase === 'fetching') {
            searchElement = <ReactLoading style={centerDiv} type="bars" color="#444" height="70" width="20" />;
        } else if (phase === 'fetched' && (type === 'searchByName' || type === 'searchByTagCategory')) {
            searchElement = <SearchElements allElements={this.state.elements} />;
        }

        if (type === 'searchByName' || type === 'searchByTagCategory') {
            inputSearch = (
                <form onSubmit={this.onSubmit}>
                    <SearchBar
                        onSearchItemNow={this.onSearchItemNow}
                        onSearchItemChange={this.elementSearch}
                    />
                    <button type="submit" className="btn btn-primary btn-search-go">Go!</button>
                </form>
            );
        } else if (type === 'searchByIngredients') {
            inputSearch = (
                <div style={{ display: 'flex' }}>
                    <MultiSelect
                        onOptionsChange={this.onMultiSelectChange}
                        options={this.state.fetchedIngredients}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary btn-search-go"
                        disabled={!this.state.selectedOptions.length}
                        onClick={this.handleSearchButtonClick}
                    >
                    Go!
                    </button>
                </div>
            );
        } else if (type === 'searchByTags') {
            inputSearch = <div>multy search tags</div>;
        }
        return (
            <section className="search-section">
                <h1 className="search-title">Welcome! Whanna Chew?</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="input-group header-search-group">
                            <DropDown onSearchTypeChange={this.typeChange} />
                            {inputSearch}
                            {searchElement}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

SearchComponent.propTypes = {
};

export default SearchComponent;
