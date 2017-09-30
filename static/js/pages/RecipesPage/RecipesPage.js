import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import ReactLoading from 'react-loading';

import Recipes from './Recipes';
import SearchComponent from './SearchComponent';
import Header from '../../common/Header';

import wait from '../../common/wait';

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

class RecipesPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            recipes: [],
            process: 'fetching', 
        };
        this.getRecipes = this.getRecipes.bind(this);
    }

    componentWillMount() {
        wait(2000)
        .then(() => {
            this.changeRecipeParams(
                this.props.params.tag_id, 
                this.props.params.name, 
                this.props.params.tagtype
            );
        })
        .catch((err) => {
            this.setState({ process: 'failedToFetch' });
            console.log(err, 'Failed to get recipes data');
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ process: 'fetching' });
        wait(2000)
        .then(() => {
            this.changeRecipeParams(
                nextProps.params.tag_id, 
                nextProps.params.name, 
                nextProps.params.tagtype
            );
        })
        .catch((err) => {
            this.setState({ process: 'failedToFetch' });
            console.log(err, 'Failed to get recipes data');
        });
    }

    getAllRecipes() {
        const url = '/api/recipes';
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({ process: 'fetched', recipes: response }))
            .catch((err) => {
                this.setState({ process: 'failedToFetch' });
                console.log(err, 'Failed to get recipes data');
            });
    }

    getRecipesByTagId(tagId) {
        const url = `/api/${tagId}/recipes`;
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({ process: 'fetched', recipes: response }))
            .catch((err) => {
                this.setState({ process: 'failedToFetch' });
                console.log(err, 'Failed to get recipes data');
            });
    }

    getRecipesByName(name) {
        const url = `/api/recipes/search/name=${name}`;
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({ process: 'fetched', recipes: response }))
            .catch((err) => {
                this.setState({ process: 'failedToFetch' });
                console.log(err, 'Failed to get recipes data');
            });
    }

    getRecipesByTagType(tagtype) {
        const url = `/api/recipes/search/tagtype=${tagtype}`;
        fetch(url)
            .then(response => response.json())
            .then(response => this.setState({ process: 'fetched', recipes: response }))
            .catch((err) => {
                this.setState({ process: 'failedToFetch' });
                console.log(err, 'Failed to get recipes data');
            });
    }

    getRecipes(elements) {
        this.setState({ recipes: elements });
    }

    changeRecipeParams(tagId, name, tagtype) {
        if (tagId) {
            this.getRecipesByTagId(tagId);
        } else if (name) {
            this.getRecipesByName(name);
        } else if (tagtype) {
            this.getRecipesByTagType(tagtype);
        } else {
            this.getAllRecipes();
        }
    }

    render() {
        const phase = this.state.process;
        if (phase === 'fetching') {
            return (
                <div>
                    <Header />
                    <ReactLoading style={centerDiv} type="bars" color="#444" height="70" width="20" />
                </div>
            );
        } else if (phase === 'fetched') {
            return (
                <div>
                    <Header />
                    <Grid>
                        <SearchComponent getRecipes={this.getRecipes} />
                        <Recipes result={this.state.recipes} />
                    </Grid>
                </div>
            );
        }
    }
}

export default RecipesPage;
