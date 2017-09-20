import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropDown extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    };

    onChange(event) {
        this.props.onSearchTypeChange(event.target.value);
    }

    render() {
        return (
            <select className="form-control select-search" onChange={this.onChange}>
                <option value="searchByName">Name</option>
                <option value="searchByTagCategory">Tag Type</option>
            </select>
        );
    }
}

DropDown.propTypes = {
    onSearchTypeChange: PropTypes.func
};


export default DropDown;