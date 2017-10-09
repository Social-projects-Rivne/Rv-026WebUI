import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import axios from 'axios';

import Recipes from './Recipes';
import SearchComponent from './SearchComponent';
import Header from '../../common/Header';

import wait from '../../common/wait';

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

const findMaxId = (arr) => {
    let maxId = 0;
    arr.forEach((el) => {
        if (el.id > maxId) {
            maxId = el.id;
        }
    });
    return maxId;
};

const makeFetchOptions = maxId =>
    ({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ maxId }),
    });

class RecipesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            process: 'fetching',
        };
        this.getRecipes = this.getRecipes.bind(this);
        this.onBottomScroll = this.onBottomScroll.bind(this);
        this.getAllRecipes = this.getAllRecipes.bind(this);
    }

    componentWillMount() {
        wait(2000)
        .then(() => {
            this.changeRecipeParams(
                this.props.params.tag_id,
                this.props.params.name,
                this.props.params.tagtype,
                this.props.params.ingredients,
            );
        })
        .catch((err) => {
            this.setState({ process: 'failedToFetch' });
            console.log(err, 'Failed to get recipes data');
        });
        window.addEventListener('scroll', this.onBottomScroll);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ process: 'fetching', recipes: [] });
        wait(2000)
        .then(() => {
            this.changeRecipeParams(
                nextProps.params.tag_id,
                nextProps.params.name,
                nextProps.params.tagtype,
                nextProps.params.ingredients,
            );
        })
        .catch((err) => {
            this.setState({ process: 'failedToFetch' });
            console.log(err, 'Failed to get recipes data');
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onBottomScroll);
    }

    onBottomScroll() {
        const windowHeight = window.innerHeight; // 953
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        const windowBottom = windowHeight + window.pageYOffset; // 953 + 317 = 1270

        if (windowBottom >= docHeight - 3) {
            this.changeRecipeParams(
                this.props.params.tag_id,
                this.props.params.name,
                this.props.params.tagtype,
                this.props.params.ingredients,
            );
        }
    }

    getAllRecipes() {
        const url = '/api/recipes';
        const options = makeFetchOptions(findMaxId(this.state.recipes));

        fetch(url, options)
            .then(response => response.json())
            .then((response) => {
                const recipes = this.state.recipes.concat(response);
                this.setState({ process: 'fetched', recipes });
            })
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

    getRecipesByIngredients(ingredients) {
        const url = `/api/recipes/search/ingredients=${ingredients}`;

        axios.post(url, { maxId: findMaxId(this.state.recipes) })
        .then((response) => {
            const recipes = this.state.recipes.concat(response.data);
            this.setState({ process: 'fetched', recipes });
        })
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

    changeRecipeParams(tagId, name, tagtype, ingredients) {
        if (tagId) {
            this.getRecipesByTagId(tagId);
        } else if (name) {
            this.getRecipesByName(name);
        } else if (tagtype) {
            this.getRecipesByTagType(tagtype);
        } else if (ingredients) {
            this.getRecipesByIngredients(ingredients);
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
                <div onScroll={this.onBottomScroll}>
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
