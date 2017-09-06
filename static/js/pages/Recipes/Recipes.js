import React, { Component } from 'react';
import Result from './Result';
import { Grid, Row, Col } from 'react-bootstrap'; 

class Recipes extends React.Component {  
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
            <Result result={this.state.recipes}></Result>
          </Row>
        </Grid>
      );
    }
}

export default Recipes;