import React, { Component } from 'react';
import Recipe from './Recipe';
import { Grid, Row, Col } from 'react-bootstrap'; 

class RecipesPage extends React.Component {  
   constructor(props) {
        super(props);
        this.state = { recipes: [] };
    }
    
    componentDidMount() {
      var url = `http://localhost:3090/api/recipes`;
      fetch(url) 
        .then(response => response.json() )
        .then( ({rows: recipes }) => this.setState({recipes})) 
    }
    
    render() {
      let recipes = this.state.recipes;       
      return(
        <Grid>
          <Row>
            <Recipe result={this.state.recipes}></Recipe>
          </Row>
        </Grid>
      );
    }
}

export default RecipesPage;