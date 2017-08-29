import React, { Component } from 'react';
import { Link } from 'react-router';

class RecipesPage extends Component {
    render(){
        return(
            <div>
                <h2>Recipes Page</h2>
                <Link to="/recipes/new" className="btn btn-primary">
                    Add Recipe
                </Link>
            </div> 
        );
    }
}

export default RecipesPage;