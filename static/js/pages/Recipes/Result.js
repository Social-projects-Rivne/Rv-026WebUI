import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

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
    }

    componentDidMount() {

    }

    render(){
        var recipe = this.props.recipe;
        const recipeUrl = '/recipes/' + recipe.id;

        return(
            <Link to={recipeUrl}>
            <Col sm={3}>
                <div style={recipeHead}>
                    <img className="img-rounded" src={recipe.photo} style={imgStyle}/>
                    <span style={title}>{recipe.title}</span>
                </div>
                <p style={description}>{recipe.description}</p>
            </Col>
            </Link>
        );
    }
}

export default Result;