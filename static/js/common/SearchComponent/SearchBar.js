import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { item: '' };
    }

    onInputChange(item) {
        this.setState({ item });
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    type="text"
                    class="form-control"
                    value={this.state.item}
                    onChange={event => this.onInputChange(event.target.value)}
                />
            </div>
        );
    }
}

export default SearchBar;