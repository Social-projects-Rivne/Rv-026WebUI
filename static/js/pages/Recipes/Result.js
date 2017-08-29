import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const imgStyle = {
    width: '100%',
    maxHeight: '150px',
    marginBottom: '15px'
}

const recipeHead = {
    display:'inline-block',  
    position:'relative'
}

const title = {
    display:'inline-block',  
    position:'absolute',
    bottom: '10px',
    left: '15px',
    color: 'white',
    fontSize: '26px'
}

const description = {
    textAlign: 'justify',
    fontSize: '16px'
}

class Result extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        var recipes = this.props.result.map(function(result,index){
            return <ResultItem key={index} recipe={ result } />
            });
        return(
            <div>
                <div className="col-sm-12">
                    {recipes}
                </div>
            </div>
        );
    }
}

class ResultItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = { tags: [], tagsRecipes: [] };
    }

    componentDidMount() {
      fetch(`http://localhost:3090/api/tags/all`) 
        .then(response => response.json() )
        .then( ({rows: tags }) => this.setState({tags}))
      fetch(`http://localhost:3090/api/recipes/tags`) 
        .then(response => response.json() )
        .then( ({rows: tagsRecipes }) => this.setState({tagsRecipes}))
    }

    render(){
        var recipe = this.props.recipe;

        return(
            <Col sm={3}>
                <div style={recipeHead}>
                    <img className="img-rounded" src={"../../../../../public/images/recipes/"+recipe.photo} style={imgStyle}/>
                    <span style={title}>{recipe.title}</span>
                </div>
                <p style={description}>{recipe.description}</p>
            </Col>
        );
    }
}

export default Result;