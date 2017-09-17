import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { item: '' };
    }

    onInputChange(item) {
        this.setState({ item });
        this.props.onSearchItemChange(item);
    }

    render() {
        return (
            <input
                type="text"
                className="form-control input-search"
                placeholder="Find your dish"
                value={this.state.item}
                onChange={event => this.onInputChange(event.target.value)}
            />
        );
    }
}

SearchBar.propTypes = {
    onSearchItemChange: PropTypes.func
};

export default SearchBar;