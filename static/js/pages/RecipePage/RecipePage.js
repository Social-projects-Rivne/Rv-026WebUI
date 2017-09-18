import axios from 'axios';
import { Link } from 'react-router';
import ReactLoading from 'react-loading';
import React, { Component } from 'react';
import wait from '../../common/wait';

const photoStyle = {
    borderRadius: 10,
    width: '100%',
    height: 'auto',
    maxHeight: '300px',
    maxWidth: '300px',
    margin: 'auto',
};

const h1NameStyle = {
    color: '#357786',
    textAlign: 'center',
};

const h3NameStyle = {
    color: '#357786',
    textAlign: 'center',
};

const ulIngredients = {
    float: 'none',
    display: 'table',
    margin: '0 auto',
    width: 'auto',
};

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

class RecipePage extends Component {
    propTypes = {
        params: React.PropTypes.object.isRequired,
    }

    constructor() {
        super();
        this.state = {
            process: 'fetching',
            data: null,
        };
    }

    componentWillMount() {
        const url = `/api/recipes/${this.props.params.id}`;

        if (!this.props.params.id.match(/^[0-9]+$/)) {
            this.setState({ process: 'failedToFetch' });
        }
        // !!! wait only for demo purposes, remove for production!!!!!!!!!
        wait(2000)
            .then(() => axios.get(url))
            .then((res) => {
                if (typeof (res.data) !== 'object' || res.data.length === 0) {
                    this.setState({ process: 'failedToFetch' });
                    return;
                }
                this.setState({ process: 'fetched', data: res.data });
            })
            .catch((err) => {
                this.setState({ process: 'failedToFetch' });
                console.log(err.stack);
                console.log('Failed to get recipe data');
            });
    }

    createTagLinks = (tags) => {
        if (tags.length !== 0) {
            return tags.map((tag, index) => <span key={index}> <Link to="#">{tag.name}</Link> &ensp;</span>);
        }
        return 'no tags yet';
    };

    render() {
        const recipe = this.state.data;
        const phase = this.state.process;
        if (phase === 'fetching') {
            return (
                <ReactLoading style={centerDiv} type="bars" color="#444" height="70" width="20" />
            );
        } else if (phase === 'fetched') {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 text-center">
                            <h1 style={h1NameStyle}>{recipe.title}</h1>
                            <img src={recipe.photo} style={photoStyle} alt="" />
                        </div>
                        <div className="col-sm-7">
                            <h3 style={h3NameStyle}>Rating:{recipe.rating}</h3>
                            <h3 style={h3NameStyle}>Ingredients:</h3>
                            <ol style={ulIngredients}>
                                {
                                    recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))
                                }
                            </ol>
                        </div>
                    </div>
                    <p>{recipe.description}</p>
                    <div> Tags:&ensp;
                        {this.createTagLinks(this.state.data.tags)}
                    </div>

                </div>
            );
        } else if (phase === 'failedToFetch') {
            return (
                <div>Failed to fetch data from server</div>
            );
        }
        return true;
    }
}

export default RecipePage;
