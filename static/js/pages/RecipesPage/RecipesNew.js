import React, { Component } from 'react';
import { Link } from 'react-router';

import RecipesForm from './RecipesForm';

class RecipesNew extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="container">
                <RecipesForm />
            </div>
        )
    }
}

export default RecipesNew;