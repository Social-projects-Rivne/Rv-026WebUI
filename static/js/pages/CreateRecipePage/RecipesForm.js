import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
    Button,
    FormControl,
    FormGroup,
    ButtonGroup,
    Thumbnail,
} from 'react-bootstrap';
import _ from 'underscore';
import axios from 'axios';

class RecipesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            is_deleted: false,
            photo: '',
            imagePreviewUrl: '',
            rating: 0,
            tags: '',

            emptyTitle: '',
            emptyDescription: '',
            emptyPhoto: '',

            buttonDisabledTitle: true,
            buttonDisabledDescription: true,
            buttonDisabledPhoto: true,

            titleExists: '',
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPhotoChange = this.onPhotoChange.bind(this);
        this.onPhotoClick = this.onPhotoClick.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkTitleExists = this.checkTitleExists.bind(this);
    }



    onTitleChange(e) {
        this.setState({ title: e.target.value });
        this.setState({ buttonDisabledTitle: !e.target.value });
        this.emptyValidate(e.target.value, 'emptyTitle', 'Title is Required');
        this.checkTitleExists(e.target.value);
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value });
        this.setState({ buttonDisabledDescription: !e.target.value });
        this.emptyValidate(e.target.value, 'emptyDescription', 'Description is Required');
    }

    onPhotoChange(e) {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];
        this.setState({ buttonDisabledPhoto: false });
        this.emptyValidate(e.target.files, 'emptyPhoto', 'Photo is Required');

        if (file && file.type.match('image.*')) {
            reader.onloadend = () => {
                this.setState({
                    photo: file,
                    imagePreviewUrl: reader.result,
                });
            };

            reader.readAsDataURL(file);
        }
    }

    onTagsChange(e) {
        this.setState({ tags: e.target.value });
    }

    onPhotoClick(e) {
        e.target.value = null;
        this.emptyValidate(e.target.value, 'emptyPhoto', 'Photo is Required');
        this.setState({ buttonDisabledPhoto: true });
    }

    onSubmit(e) {
        e.preventDefault();
        const title = this.state.title.trim();
        const description = this.state.description.trim();
        const isDeleted = this.state.is_deleted;
        const photo = this.state.photo;
        const tags = this.state.tags;
        const rating = this.state.rating;

        if (!title || !description || !photo) {
            return;
        }
        this.props.handleSubmit({
            title,
            description,
            isDeleted,
            photo,
            tags,
            rating,
        });
        this.setState({
            title: '',
            description: '',
            tags: '',

            buttonDisabledTitle: true,
            buttonDisabledDescription: true,
        });
    }

    emptyValidate(value, emptyField, emptyMessage) {
        if (_.isEmpty(value)) {
            this.setState({ [emptyField]: [emptyMessage] });
        } else {
            this.setState({ [emptyField]: null });
        }
    }

    titleCheckTimeout = null;
    checkTitleExists(title) {
        if (this.titleCheckTimeout !== null) {
            clearTimeout(this.titleCheckTimeout);
        }
        this.titleCheckTimeout = setTimeout(() => {
            axios.post('/api/checkTitleExistence', { title })
                .then((res) => {
                    if (res.data === 'titleExists') {
                        this.setState({ titleExists: 'Title exist' });
                        this.setState({ buttonDisabledTitle: true });
                    } else if (res.data === 'titleDoesntExist') {
                        this.setState({ titleExists: '' });
                    } else {
                        console.log(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err.stack);
                    console.log('Failed to check email');
                });
        }, 0);
    }

    errorMessage = (m) => m === null ? '' : <div className="text-danger">{m}</div>;

    render() {
        const { imagePreviewUrl } = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<Thumbnail alt="171x180" src={imagePreviewUrl} />);
        }

        return (
            <form className="create-recipe-form" onSubmit={this.onSubmit}>
                <h1 className="title">Create New Recipe</h1>
                <FormGroup>
                    <label htmlFor="RecipesForm--title">Title</label>
                    <FormControl
                        type="text"
                        name="title"
                        id="RecipesForm--title"
                        placeholder="Title recipe"
                        value={this.state.title}
                        onChange={this.onTitleChange}
                    />
                    {this.errorMessage(this.state.emptyTitle)}
                    {this.errorMessage(this.state.titleExists)}
                </FormGroup>
                <FormGroup>
                    <label htmlFor="RecipesForm--description">Description</label>
                    <FormControl
                        componentClass="textarea"
                        name="description"
                        id="RecipesForm--description"
                        placeholder="Description recipe"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    {this.errorMessage(this.state.emptyDescription)}
                </FormGroup>
                <FormGroup>
                    <label htmlFor="RecipesForm--photo">Photo</label>
                    <FormControl
                        type="file"
                        name="photo"
                        id="RecipesForm--photo"
                        onChange={this.onPhotoChange}
                        onClick={this.onPhotoClick}
                        accept="image/x-png,image/gif,image/jpeg"
                    />
                    {this.errorMessage(this.state.emptyPhoto)}
                </FormGroup>
                {imagePreview}
                <FormGroup>
                    <label htmlFor="RecipesForm--tags">Tags</label>
                    <FormControl
                        componentClass="textarea"
                        name="tags"
                        id="RecipesForm--tags"
                        placeholder="Write tags using commas"
                        value={this.state.tags}
                        onChange={this.onTagsChange}
                    />
                    {this.errorMessage(this.state.emptyTags)}
                </FormGroup>
                <FormGroup>
                    <Button
                        type="submit"
                        bsStyle="info"
                        disabled={
                            this.state.buttonDisabledTitle ||
                            this.state.buttonDisabledDescription ||
                            this.state.buttonDisabledPhoto}
                    >
                        Create
                    </Button>
                    <Link to="/recipes" className="btn btn-danger btn-cancel">Cancel</Link>
                </FormGroup>
            </form>
        );
    }
}

RecipesForm.PropTypes = {
    handleSubmit: PropTypes.func,
};

export default RecipesForm;
