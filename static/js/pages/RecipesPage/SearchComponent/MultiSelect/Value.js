import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Value extends Component {
    static propTypes = {
        onRemove: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);

        this.onRemove = this.onRemove.bind(this);
        this.renderRemoveIcon = this.renderRemoveIcon.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
    }

    onRemove(event) {
        event.preventDefault();
        event.stopPropagation();

        this.props.onRemove(this.props.value);
    }

    renderRemoveIcon() {
        return (
            <div
                className="Select-value-icon"
                onMouseDown={this.onRemove}
            >
                &times;
            </div>
        );
    }

    renderLabel() {
        return (
            <span className="Select-value-label">
                {this.props.value}
            </span>
        );
    }

    render() {
        return (
            <div className="Select-value">
                {this.renderRemoveIcon()}
                {this.renderLabel()}
            </div>
        );
    }
}

export default Value;
