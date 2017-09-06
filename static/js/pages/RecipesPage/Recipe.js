import React, { Component } from 'react';
import { Link } from 'react-router';
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

class Recipe extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        var recipe = this.props.result.map(function(result,index){
            return <RecipeItem key={index} recipe={ result } />
            });
        return(
            <div>
                <div className="col-sm-12">
                    {recipe}
                </div>
            </div>
        );
    }
}

class RecipeItem extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render(){
        var recipe = this.props.recipe;
        var ids = recipe.tags_id;
        var tags_name = recipe.tags_name;
        var tags = [];
        for (var i = 0; i < ids.length; i++) {
          tags.push(<span key={i}><Link to={`${ids[i]}`} className='badge'>{tags_name[i]}</Link>{'\u00A0'}</span>);
        }
        return(
            <Col sm={3}>
                <div style={recipeHead}>
                    <img className="img-rounded" src={recipe.photo} style={imgStyle}/>
                    <span style={title}>{recipe.title}</span>
                </div>
                <p style={description}>{recipe.description}</p>
                <p>{tags}</p>
            </Col>
        );
    }
}

export default Recipe;