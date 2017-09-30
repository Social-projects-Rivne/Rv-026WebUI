import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AlertContainer from 'react-alert';
import axios from 'axios';

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

    handleSubmit(recipe) {
        const data = new FormData();
        for (const key in recipe) {
            if (hasOwnProperty.call(recipe, key)) {
                data.append(key, recipe[key]);
            }
        }
        axios.post('/api/recipe', data)
            .then(res => this.msg.show(res.data, { type: 'success' }))
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
