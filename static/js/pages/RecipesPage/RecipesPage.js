import React, { Component } from 'react';
import Recipe from './Recipe';
import { Grid, Row, Col } from 'react-bootstrap';

import SearchComponent from '../../common/SearchComponent';

const style = {
    marginTop: '25px'
}
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

    getRecipes(elements){
        this.setState({ recipes: elements});
    }

    render() {
        let recipes = this.state.recipes;
        return (
            
            <Grid >
                <SearchComponent getRecipes={this.getRecipes} />
                <div style={style}/>
                <Row>
                    <Recipe result={this.state.recipes} />
                </Row>
            </Grid>
        );
    }
}

export default RecipesPage;