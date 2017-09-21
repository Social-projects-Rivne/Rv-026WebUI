import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';


const imgStyle = {
    width: '100%',
    maxHeight: '150px',
    marginBottom: '15px'
}

const recipeHead = {
    display: 'inline-block',
    position: 'relative'
}

const title = {
    display: 'inline-block',
    position: 'absolute',
    bottom: '10px',
    left: '15px',
    color: 'black',
    fontSize: '20px'
}

const description = {
    textAlign: 'justify',
    fontSize: '16px'
}

class RecipeItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var recipe = this.props.recipe;
        var ids = recipe.tags_id;
        var tags_name = recipe.tags_name;
        var tags = [];

        for (var i = 0; i < ids.length; i++) {
            if (ids[i]) {
                tags.push(
                    <span key={i}>
                        <Link to={`/${ids[i]}/recipes`} className='badge'>{tags_name[i]}</Link>{'\u00A0'}
                    </span>);
            }
        }

        return (
            <Col sm={3}>
                <Link to={`/recipes/${recipe.id}/`}>
                <div style={recipeHead}>
                    <img className="img-rounded" src={recipe.photo} style={imgStyle} />
                    <span style={title}>{recipe.title}</span>
                </div>
                <p style={description}>{recipe.description}</p>
                </Link>
                {tags.length > 0 ? <p>{tags}</p> : null}
            </Col>
        );

    }
}

export default RecipeItem;