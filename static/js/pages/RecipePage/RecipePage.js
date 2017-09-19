import axios from 'axios';
import { Link } from 'react-router';
import ReactLoading from 'react-loading';
import React, { Component } from 'react';
import wait from '../../common/wait';
import EditableList from '../../common/EditableList';
import EditableImage from '../../common/EditableImage';
import EditableText from '../../common/EditableText';


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
            ingredientsStatus: '',
            tagsStatus: '',
            titleStatus: '',
            photoStatus: '',
            descriptionStatus: '',
            process: 'fetching',
            data: null,
        };
        this.saveToDBList = this.saveToDBList.bind(this);
        this.saveToDBText = this.saveToDBText.bind(this);
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

    saveToDBList(id, addValue, deleteValue, fieldName) {
        // wait only for demo purposes, remove for production!!!!

        wait(3000)
        .then(
            () => {
                const updatedValue = {
                    id,
                    fieldName,
                    addValue,
                    deleteValue,
                };
                axios.put(`/api/recipe/edit/${id}`, updatedValue)
                .then((res) => {
                    if (res.status === 200) {
                        console.log("success", `${fieldName}Status`);
                        this.setState({ [`${fieldName}Status`]: 'success' });
                    } else {
                        console.log("error");
                        this.setState({ [`${fieldName}Status`]: 'error' });
                    }
                })
                .catch(() => {
                    console.log("catch error");
                    this.setState({ [`${fieldName}Status`]: 'error' });
                });
            });
    }

    saveToDBText(id, fieldName, value) {
        // wait only for demo purposes, remove for production!!!!
        wait(3000)
        .then(
            () => {
                const updatedValue = {
                    id,
                    fieldName,
                    value,
                };
                axios.put(`/api/recipe/edit/${id}`, updatedValue)
                .then((res) => {
                    if (res.status === 200) {
                        console.log("success", `${fieldName}Status`);
                        this.setState({ [`${fieldName}Status`]: 'success' });
                    } else {
                        console.log("error");
                        this.setState({ [`${fieldName}Status`]: 'error' });
                    }
                })
                .catch(() => {
                    console.log("catch error");
                    this.setState({ [`${fieldName}Status`]: 'error' });
                });
            });
    }

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
                            <EditableText
                                updateId={recipe.id}
                                fieldName="title"
                                status={this.state.titleStatus}
                                style={h1NameStyle}
                                text={recipe.title}
                                onSave={this.saveToDBText}
                                type={'input'}/>
                            <EditableImage
                                updateId={recipe.id}
                                style={photoStyle}
                                fieldName="photo"
                                status={this.state.photoStatus}
                                link={recipe.photo}
                                onSave={this.saveToDBText}/>
                        </div>
                        <div className="col-sm-7">
                            <h3 style={h3NameStyle}>Rating:{recipe.rating}</h3>
                            <h3 style={h3NameStyle}>Ingredients:</h3>
                                <EditableList 
                                    updateId={recipe.id}
                                    fieldName="ingredients"
                                    data={recipe.ingredients}
                                    status={this.state.ingredientsStatus}
                                    onSave={this.saveToDBList}/>
                        </div>
                    </div>
                    <div>
                        <EditableText
                            updateId={recipe.id}
                            fieldName="description"
                            status={this.state.descriptionStatus}
                            text={recipe.description}
                            onSave={this.saveToDBText}
                            type={'textarea'}/>
                    </div>
                    <div> Tags:&ensp;
                            <EditableList
                                updateId={recipe.id}
                                fieldName="tags"
                                data={recipe.tags}
                                status={this.state.tagsStatus}
                                onSave={this.saveToDBList}/>
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
