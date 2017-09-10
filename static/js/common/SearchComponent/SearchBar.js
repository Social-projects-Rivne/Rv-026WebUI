import React, { Component } from 'react';

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
            <div className="search-bar">
                <input
                    type="text"
                    className="form-control"
                    value={this.state.item}
                    onChange={event => this.onInputChange(event.target.value)}
                />
            </div>
        );
    }
}

export default SearchBar;