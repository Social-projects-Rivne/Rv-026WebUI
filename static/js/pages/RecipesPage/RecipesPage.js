import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ReactLoading from 'react-loading';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Recipes from './Recipes';
import SearchComponent from './SearchComponent';
import Header from '../../common/Header';
import constants from '../../common/constants';
import wait from '../../common/wait';
import {
    getAllRecipes,
    getRecipesByIngredients,
    getRecipesByTagId,
    getRecipesByName,
    getRecipesByTagType,
    clearRecipes,
} from '../../actions/recipesAction';

class RecipesPage extends Component {
    constructor(props) {
        super(props);
        this.onBottomScroll = this.onBottomScroll.bind(this);
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
        });
        window.addEventListener('scroll', this.onBottomScroll);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params !== this.props.params) {
            this.props.clearRecipes();
            wait(2000)
            .then(() => {
                this.changeRecipeParams(
                    nextProps.params.tag_id,
                    nextProps.params.name,
                    nextProps.params.tagtype,
                    nextProps.params.ingredients,
                );
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onBottomScroll);
    }

    onBottomScroll() {
        const windowHeight = window.innerHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight - 3) {
            this.changeRecipeParams(
                this.props.params.tag_id,
                this.props.params.name,
                this.props.params.tagtype,
                this.props.params.ingredients,
            );
        }
    }

    changeRecipeParams(tagId, name, tagtype, ingredients) {
        const { recipes } =  this.props;
        if (tagId) {
            this.props.getRecipesByTagId(tagId, recipes);
        } else if (name) {
            this.props.getRecipesByName(name, recipes);
        } else if (tagtype) {
            this.props.getRecipesByTagType(tagtype, recipes);
        } else if (ingredients) {
            this.props.getRecipesByIngredients(ingredients, recipes);
        } else {
            this.props.getAllRecipes(recipes);
        }
    }

    render() {
        const { process, recipes } = this.props;console.log(recipes);
        let recipesComponent = null;
        if (_.isEmpty(recipes)) {
            recipesComponent = <p className="recipe-not-found">Recipes are not found:( Try again</p>;
        } else {
            recipesComponent = <Recipes result={this.props.recipes} />;
        }

        if (process === 'fetching') {
            return (
                <div>
                    <Header />
                    <ReactLoading style={constants.centerDiv} type="bars" color="#444" height="70" width="20" />
                </div>
            );
        } else if (process === 'fetched') {
            return (
                <div onScroll={this.onBottomScroll}>
                    <Header />
                    <Grid>
                        <SearchComponent />
                        {recipesComponent}
                    </Grid>
                </div>
            );
        }
    }
}

RecipesPage.PropTypes = {
    getAllRecipes: PropTypes.func,
    getRecipesByIngredients: PropTypes.func,
    getRecipesByTagId: PropTypes.func,
    getRecipesByName: PropTypes.func,
    getRecipesByTagType: PropTypes.func,
    clearRecipes: PropTypes.func,
    recipes: PropTypes.array.isRequired,
    process: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        recipes: state.recipes.all,
        process: state.recipes.process,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllRecipes,
        getRecipesByIngredients,
        getRecipesByTagId,
        getRecipesByName,
        getRecipesByTagType,
        clearRecipes,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);
