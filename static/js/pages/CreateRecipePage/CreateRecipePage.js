import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AlertContainer from 'react-alert';

import Header from '../../common/Header';
import RecipesForm from './RecipesForm';

class CreateRecipePage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'light',
        time: 1000,
        transition: 'fade',
        type: 'success',
    }

    addRecipe(recipe) {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append('title', recipe.title);
            data.append('description', recipe.description);
            data.append('is_deleted', recipe.is_deleted);
            data.append('photo', recipe.photo);
            data.append('tags', recipe.tags);
            data.append('ingredients', recipe.ingredients);
            data.append('rating', recipe.rating);
            const xhr = new XMLHttpRequest();
            xhr.open('post', '/api/recipe', true);
            xhr.onload = function add() {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(this.statusText);
                }
            };
            xhr.send(data);
        });
    }

    handleSubmit(recipe) {
        this.addRecipe(recipe)
            .then(res => this.msg.show(res, { type: 'success' }))
            .then(setTimeout(() => browserHistory.push('/recipes'), 2000))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <RecipesForm handleSubmit={this.handleSubmit} />
                    <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                </div>
            </div>
        );
    }
}

export default CreateRecipePage;
