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
        this.state = { categories: [] };
    }

    componentDidMount() {
      fetch(`http://localhost:3090/api/category/all`) 
        .then(response => response.json() )
        .then( ({rows: categories }) => this.setState({categories})) 
    }

    click(id){
        this.props.parentMethod('http://localhost:3090/api/recipes/category/'+id);
    }

    render() {
        var recipes = this.props.result.map(function(result,index){
            return <ResultItem key={index} recipe={ result } />
            });
        let categories = this.state.categories;
        return(
            <div>
                <div className="col-sm-3 col-sm-push-9">
                    {this.state.categories.map((category) => <div onClick={() => this.click(category.id)} key={category.id}>{category.name}</div>)}
                </div>  
                <div className="col-sm-9 col-sm-pull-3">
                    {recipes}
                </div>
            </div>
        );
    }
}

class ResultItem extends React.Component{
    render(){
        var recipe = this.props.recipe;
        return(
            <Col sm={4}>
                <div style={recipeHead}>
                    <img className="img-rounded" src={recipe.photo} style={imgStyle}/>
                    <span style={title}>{recipe.title}</span>
                </div>
                <p style={description}>{recipe.description}</p>
            </Col>
        );
    }
}

export default Result;