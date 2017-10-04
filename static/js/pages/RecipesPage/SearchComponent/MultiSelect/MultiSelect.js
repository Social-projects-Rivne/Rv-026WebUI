import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Option from './Option';
import Value from './Value';

class MultiSelect extends Component {
    constructor(props) {
        super(props);

        [
            'clearValues',
            'handleMouseDownOnArrow',
            'handleMouseDown',
            'handleInputChange',
            'handleInputMouseDown',
            'renderSelectedOptions',
            'removeValue',
            'renderInput',
            'selectValue',
        ].forEach((fn) => { this[fn] = this[fn].bind(this); });

        this.outerIsFocused = false;

        this.state = {
            isOpen: false,
            selectedValues: [],
            filteredOptions: [],
        };
    }

    componentDidUpdate() {
        const diff = this.wrapperContainer.offsetWidth - this.wrapper.offsetWidth;
        (diff > 0) ?
            this.wrapperScrollable.style.left = `-${diff}px` :
            this.wrapperScrollable.style.left = '0px';
    }

    clearValues(event) {
        event.stopPropagation();
        event.preventDefault();
        this.setState({
            selectedValues: [],
            filteredOptions: [],
            isOpen: true,
        });
        this.props.onOptionsChange([]);
        this.input.focus();
    }

    selectValue(value) {
        const arr = this.state.selectedValues;
        arr.push(value.name);
        this.setState({
            selectedValues: arr,
            isOpen: true,
            filteredOptions: [], // not selected options which remain in dropdown
        });
        this.props.onOptionsChange(this.convertNamesToIds(arr));
        this.input.value = '';
    }

    convertNamesToIds = (arrNames) => {
        const idArray = arrNames.map(
            (name) => {
                let foundId = null;
                this.props.options.forEach(
                    (opt) => {
                        if (opt.name === name) {
                            foundId = opt.id;
                        }
                    },
                );
                return foundId;
            },
        );
        return idArray;
    }

    handleMouseDownOnArrow(event) {
        // if menu is closed do nothing
        if (!this.state.isOpen) {
            return;
        }
        // else close menu
        event.stopPropagation();
        event.preventDefault();
        this.setState({ isOpen: false });
    }

    removeValue(value) {
        const arr = this.state.selectedValues;
        const index = arr.indexOf(value);
        arr.splice(index, 1);
        this.setState({ selectedValues: arr });
        this.props.onOptionsChange(this.convertNamesToIds(arr));
        this.input.value = '';
        if (!this.state.isOpen) {
            this.setState({ isOpen: true });
        }
    }


    handleMouseDown(event) {
        event.stopPropagation();
        event.preventDefault();

        this.input.focus();
    }

    handleInputChange(event) {
        if (!this.state.isOpen) {
            this.setState({ isOpen: true });
        }
        const options = this.props.options
            .filter(
                option => this.state.selectedValues.indexOf(option.name) === -1,
            )
            .filter(
                op => op.name.toLowerCase().indexOf(event.target.value.toLowerCase()) === 0,
            );
        this.setState({ filteredOptions: options });
    }

    handleInputMouseDown(event) {
        event.stopPropagation();
        event.preventDefault();
        this.input.focus();
    }

    renderOuter(options) {
        const menu = this.renderMenu(options);
        if (!menu) {
            return null;
        }

        return (
            <div
                tabIndex="0"
                ref={(ref) => { this.outer = ref; }}
                onMouseDown={() => {
                    this.outerIsFocused = true;
                }}
                onBlur={() => {
                    this.outerIsFocused = false;
                    this.setState({ isOpen: false });
                }}
                className="Select-menu-outer"
            >
                <div className="Select-menu">
                    {menu}
                </div>
            </div>
        );
    }

    renderInput() {
        return (
            <div className="Select-input" key="input-wrap">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={this.handleInputChange}
                    ref={(ref) => { this.input = ref; }}
                    onMouseDown={this.handleInputMouseDown}
                    onFocus={() => this.setState({ isOpen: true })}
                    onBlur={() => {
                        if (!this.outerIsFocused) {
                            this.setState({ isOpen: false });
                        } else {
                            this.outer.focus();
                        }
                    }}
                />
            </div>
        );
    }


    renderSelectedOptions() {
        return this.state.selectedValues.map(value => (
            <Value
                key={value}
                value={value}
                onRemove={this.removeValue}
            />
        ));
    }

    renderMenu(options) {
        if (options.length === 0) {
            return null;
        }
        return options.map(option => (
            <Option
                value={option.name}
                key={option.name}
                onSelect={() => this.selectValue(option)}
            />
        ));
    }

    renderArrow() {
        return (
            <div className="Arrow-zone" onMouseDown={this.handleMouseDownOnArrow}>
                <div className="glyphicon glyphicon-triangle-bottom" />
            </div>
        );
    }

    renderClear() {
        return (
            <div
                className="Select-clear-zone"
                onMouseDown={this.clearValues}
            >
                <div className="glyphicon glyphicon-remove" />
            </div>
        );
    }

    render() {
        let options = this.props.options.filter(
            option => this.state.selectedValues.indexOf(option.name) === -1,
        );
        if (this.state.filteredOptions.length > 0) {
            options = this.state.filteredOptions;
        }
        return (
            <div className="Select">
                <div
                    className="Select-control"
                    onMouseDown={this.handleMouseDown}
                >
                    <div
                        ref={(ref) => { this.wrapper = ref; }}
                        className="Select-multi-value-wrapper"
                    >
                        <div
                            className="Select-multi-value-wrapper-scrollable"
                            ref={(ref) => { this.wrapperScrollable = ref; }}
                        >
                            <div
                                className="Select-multi-value-wrapper-container"
                                ref={(ref) => { this.wrapperContainer = ref; }}
                            >
                                {this.renderSelectedOptions()}
                                {this.renderInput()}
                            </div>
                        </div>
                    </div>
                    {this.renderClear()}
                    {this.renderArrow()}
                </div>
                {this.state.isOpen ? this.renderOuter(options) : null}
            </div>
        );
    }
}

MultiSelect.propTypes = {
    options: PropTypes.array,
    onOptionsChange: PropTypes.func,
};

MultiSelect.defaultProps = {
    options: [],
    onOptionsChange: () => {},
};

export default MultiSelect;

