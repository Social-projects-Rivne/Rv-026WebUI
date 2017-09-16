import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';

import SearchBar from './SearchBar';
import DropDown from './DropDown';
import SearchElements from './SearchElements';

const searchcomp = {
    position: 'absolute'
} 

const style = {
    display: 'inline-block',
    float: 'left',
    width: '10%'
}

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: [],
            type: '',
            item: ''
        };

        this.typeChange = this.typeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {        
        if (prevState.type !== this.state.type) {
            this.elementSearch(this.state.item);
        }
    }

    elementSearch(item) {
        if (item) {
            switch (this.state.type) {
                case "searchByName":
                    axios.post(`/api/recipes/search`, { item })
                        .then(response => { this.setState({ elements: response.data }) })
                        .catch(error => console.log(error));
                    break;
                case "searchByTagCategory":
                    axios.post(`/api/recipes/search/tagtype`, { item })
                        .then(response => { this.setState({ elements: response.data }) })
                        .catch(error => console.log(error));
                    break;
                default:
                    this.setState({ elements: [] });
            }
            this.setState({ item });
        } else {
            this.setState({ elements: [] });
            this.setState({item:''})
        }

    }

    typeChange(type) {
        this.setState({ type });
        this.setState({ elements: [] });
    }

    onSubmit(e){
        e.preventDefault();
        var item = this.state.item;
        var type = this.state.type;
        var elements = this.state.elements;
        if (!item || !type ) {
            return;
        }
        this.props.getRecipes(elements);
    }


    render() {
        const elementSearchDelay = _.debounce((item) => { this.elementSearch(item) }, 300);
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <SearchBar onSearchItemChange={elementSearchDelay} />
                    <DropDown onSearchTypeChange={this.typeChange} />
                    <button type="submit" className="btn btn-success" style={style}>Find</button>
                </form>
                <SearchElements allElements={this.state.elements} />
            </div>
        );
    }
}

export default SearchComponent;