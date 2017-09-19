import React, { Component } from 'react';
import Recipes from './Recipes';
import { Grid, Row, Col } from 'react-bootstrap';

import SearchComponent from '../../common/SearchComponent';

class RecipesPage extends Component {
    constructor(props) {
        super(props);
        this.state = { recipes: [] };
        this.getRecipes = this.getRecipes.bind(this);
    }

    componentDidMount() {
        this.getRecipesByTagId(this.props.params.tag_id)
    }

    componentWillReceiveProps(nextProps) {
        this.getRecipesByTagId(nextProps.params.tag_id);
    }

    getRecipesByTagId(tagId) {
        var url = tagId ? `/api/${tagId}/recipes` : `/api/recipes`;
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