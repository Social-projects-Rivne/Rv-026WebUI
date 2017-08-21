import React, { Component } from 'react';
import Result from './Result';

class Recipes extends React.Component {  
   constructor() {
        super();
        this.state = { recipes: [] };
    }
    
    componentDidMount() {
        fetch(`http://localhost:3090/api/getallrecipes`) 
            .then(response => response.json() )
            .then( ({rows: recipes }) => this.setState({recipes})) 
    }
    
    render() {
      let recipes = this.state.recipes       
      return(
        <div>
          <Result result={this.state.recipes}/>
        </div>
      );
    }
}

export default Recipes;