import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    typeChange,
} from '../../../actions/searchAction';

class DropDown extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const { item } = this.props;
        this.props.typeChange(event.target.value);
    }

    render() {
        return (
            <select className="form-control select-search" onChange={this.onChange}>
                <option value="searchByName">Name</option>
                <option value="searchByTagCategory">Category</option>
                <option value="searchByIngredients">Ingredients</option>
            </select>
        );
    }
}

DropDown.propTypes = {
    typeChange: PropTypes.func,
    item: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        item: state.search.item,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        typeChange,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
