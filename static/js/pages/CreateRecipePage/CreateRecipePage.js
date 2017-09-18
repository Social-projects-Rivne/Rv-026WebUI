import React, { Component } from 'react';
import { Link } from 'react-router';
import AlertContainer from 'react-alert'

import config from '../../../../config';

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
        time: 4000,
        transition: 'fade',
        type: 'success'
    }

    addRecipe(recipe) {
        return new Promise((resolve, reject) => {
            let data = new FormData();
            data.append("title", recipe.title);
            data.append("description", recipe.description);
            data.append("is_deleted", recipe.is_deleted);
            data.append("photo", recipe.photo);
            data.append("tags", recipe.tags);
            data.append("rating", recipe.rating);
            var xhr = new XMLHttpRequest();
            xhr.open('post', `${config.serverUrl}/api/recipe`, true);
            xhr.onload = function () {
                if (this.status == 200) {
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
            .then(res => {
                this.msg.show(res, {
                    type: 'success'
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <RecipesForm handleSubmit={this.handleSubmit} />
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </div>
        )
    }
}

export default CreateRecipePage;