import React, { Component } from 'react';
import Recipe from './Recipe';
import { Grid, Row, Col } from 'react-bootstrap';

import config from '../../../../config';

class RecipesPage extends Component {
    constructor(props) {
        super(props);
        this.state = { recipes: [] };
    }

    componentDidMount() {
        this.getRecipesByTagId(this.props.params.tag_id)
    }

    componentWillReceiveProps(nextProps) {
        this.getRecipesByTagId(nextProps.params.tag_id);
    }

    getRecipesByTagId(tagId) {
        var url = tagId ? `${config.serverUrl}/api/${tagId}/recipes` : `${config.serverUrl}/api/recipes`;
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({ recipes: response }))
    }

    render() {
        let recipes = this.state.recipes;
        return (
            <Grid>
                <Row>
                    <Recipe result={this.state.recipes} />
                </Row>
            </Grid>
        );
    }
}

export default RecipesPage;