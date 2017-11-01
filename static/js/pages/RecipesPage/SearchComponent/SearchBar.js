import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    inputChange,
    requestToAutocomplete,
} from '../../../actions/searchAction';

class SearchBar extends Component {
    onInputChange(item) {
        const { searchType } = this.props;
        this.props.inputChange(item, searchType);
        this.props.requestToAutocomplete(item, searchType);
    }

    render() {
        return (
            <input
                type="text"
                className="form-control input-search"
                placeholder="Find your dish"
                value={this.props.item}
                onChange={event => this.onInputChange(event.target.value)}
            />
        );
    }
}

SearchBar.propTypes = {
    inputChange: PropTypes.func,
    requestToAutocomplete: PropTypes.func,
    item: PropTypes.string,
    searchType: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        item: state.search.item,
        searchType: state.search.searchType,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        inputChange,
        requestToAutocomplete,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
