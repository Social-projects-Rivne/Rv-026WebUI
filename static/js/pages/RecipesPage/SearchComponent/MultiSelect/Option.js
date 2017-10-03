import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Option extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
    }

    static defaultProps = {
        options: [],
        onOptionsChange: () => {},
    }

    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }
    handleMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect();
    }
    render() {
        return (
            <div
                className="Select-option"
                onMouseDown={this.handleMouseDown}
            >
                {this.props.value}
            </div>
        );
    }
}

export default Option;
