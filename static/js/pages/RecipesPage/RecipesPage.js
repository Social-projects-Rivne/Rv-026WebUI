import React, { Component } from 'react';
import Recipes from './Recipes';
import { Grid, Row, Col } from 'react-bootstrap';

import SearchComponent from './SearchComponent';

class RecipesPage extends Component {
    constructor(props) {
        super(props);
        this.state = { recipes: [] };
        this.getRecipes = this.getRecipes.bind(this);
    }

    componentDidMount() {
        this.changeRecipeParams(this.props.params.tag_id, this.props.params.name, this.props.params.tagtype);
    }

    componentWillReceiveProps(nextProps) {
        this.changeRecipeParams(nextProps.params.tag_id, nextProps.params.name, nextProps.params.tagtype);
    }

    changeRecipeParams(tagId, name, tagtype) {
        if (tagId) {
            this.getRecipesByTagId(tagId);
        } else if (name) {
            this.getRecipesByName(name);
        } else if (tagtype) {
            this.getRecipesByTagType(tagtype);
        }
        else {
            this.getAllRecipes();
        }
    }

    getAllRecipes() {
        var url = `/api/recipes`;
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({ recipes: response }))
    }

    getRecipesByTagId(tagId) {
        var url = `/api/${tagId}/recipes`;
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({ recipes: response }))
    }

    getRecipesByName(name) {
        var url = `/api/recipes/search/name=${name}`;
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({ recipes: response }))
    }

    getRecipesByTagType(tagtype) {
        var url = `/api/recipes/search/tagtype=${tagtype}`;
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({ recipes: response }))
    }

    getRecipes(elements) {
        this.setState({ recipes: elements });
    }

    render() {
        let recipes = this.state.recipes;
        return (
            <Grid>
                <SearchComponent getRecipes={this.getRecipes} />
                <Recipes result={this.state.recipes} />
            </Grid>
        );
    }
}

export default RecipesPage;