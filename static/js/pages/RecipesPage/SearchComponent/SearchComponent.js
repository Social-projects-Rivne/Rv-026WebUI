import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import ReactLoading from 'react-loading';

import MultiSelect from './MultiSelect/MultiSelect';
import SearchBar from './SearchBar';
import DropDown from './DropDown';
import SearchElements from './SearchElements';

import { changeProcess, changeType } from '../../../actions/searchAction';

import constants from '../../../common/constants';
import wait from '../../../common/wait';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptions: [], // selected options' ids from MultiSelect form
            fetchedIngredients: [], // ingredient list after fetching from server
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onMultiSelectChange = this.onMultiSelectChange.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.item !== this.props.item && this.props.item) {
            wait(200)
            .then(() => {
                this.props.changeProcess(this.props.item, this.props.searchType, this.props.elements);
            });
        }
        if (prevProps.searchType !== this.props.searchType && this.props.searchType === 'searchByIngredients') {
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
    }

    onMultiSelectChange(arr) {
        this.setState({ selectedOptions: arr });
    }

    onSubmit(e) {
        e.preventDefault();
        const { item, searchType } = this.props;

        if (!item || !searchType) {
            return;
        }
        this.props.changeType();
        if (searchType === 'searchByName') {
            browserHistory.push(`/recipes/search/name=${item}`);
        } else if (searchType === 'searchByTagCategory') {
            browserHistory.push(`/recipes/search/tagtype=${item}`);
        }
    }

    handleSearchButtonClick() {
        this.props.changeType();
        browserHistory.push(`/recipes/search/ingredients=${this.state.selectedOptions.join(',')}`);
    }

    render() {
        const { searchType, process } = this.props;
        let searchElement = null;
        let inputSearch = null;
        if (process === 'fetching') {
            searchElement = <ReactLoading style={constants.centerDiv} type="bars" color="#444" height="70" width="20" />;
        } else if (process === 'fetched' && (searchType === 'searchByName' || searchType === 'searchByTagCategory')) {
            searchElement = <SearchElements allElements={this.props.elements} />;
        }

        if (searchType === 'searchByName' || searchType === 'searchByTagCategory') {
            inputSearch = (
                <form onSubmit={this.onSubmit}>
                    <SearchBar />
                    <button type="submit" className="btn btn-primary btn-search-go">Go!</button>
                </form>
            );
        } else if (searchType === 'searchByIngredients') {
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
        }
        return (
            <section className="search-section">
                <h1 className="search-title">Welcome! Whanna Chew?</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="input-group header-search-group">
                            <DropDown />
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
    changeProcess: PropTypes.func,
    changeType: PropTypes.func,
    elements: PropTypes.array,
    item: PropTypes.string,
    process: PropTypes.string,
    searchType: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        searchType: state.search.searchType,
        elements: state.search.elements,
        item: state.search.item,
        process: state.search.process,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeProcess,
        changeType,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
