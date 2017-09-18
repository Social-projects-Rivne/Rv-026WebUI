import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'underscore';
import axios from 'axios';
import config from '../../../../config';
import {
    Button,
    FormControl,
    FormGroup,
    ButtonGroup,
    Thumbnail
} from 'react-bootstrap';

class RecipesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            is_deleted: false,
            photo: "",
            imagePreviewUrl: "",
            rating: 0,
            tags: "",

            emptyTitle: "",
            emptyDescription: "",
            emptyPhoto: "",

            buttonDisabledTitle: true,
            buttonDisabledDescription: true,
            buttonDisabledPhoto: true,

            titleExists: ""
        }
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPhotoChange = this.onPhotoChange.bind(this);
        this.onPhotoClick = this.onPhotoClick.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkTitleExists = this.checkTitleExists.bind(this);
    }

    emptyValidate(value, emptyField, emptyMessage) {
        if (_.isEmpty(value)) {
            this.setState({ [emptyField]: [emptyMessage] });
        } else {
            this.setState({ [emptyField]: null });
        }
    }

    onTitleChange(e) {
        this.setState({ title: e.target.value });
        this.setState({ buttonDisabledTitle: !e.target.value });
        this.emptyValidate(e.target.value, "emptyTitle", "Title is Required");
        this.checkTitleExists(e.target.value);
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value });
        this.setState({ buttonDisabledDescription: !e.target.value });
        this.emptyValidate(e.target.value, "emptyDescription", "Description is Required");
    }

    onPhotoChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        this.setState({ buttonDisabledPhoto: false });
        this.emptyValidate(e.target.files, "emptyPhoto", "Photo is Required");

        if (file && file.type.match('image.*')) {
            reader.onloadend = () => {
                this.setState({
                    photo: file,
                    imagePreviewUrl: reader.result
                });
            }

            reader.readAsDataURL(file);
        }
    }

    onTagsChange(e) {
        this.setState({ tags: e.target.value });
    }

    onPhotoClick(e) {
        e.target.value = null;
        this.emptyValidate(e.target.value, "emptyPhoto", "Photo is Required");
        this.setState({ buttonDisabledPhoto: true });
    }

    titleCheckTimeout = null;
    checkTitleExists(title) {
        if (this.titleCheckTimeout !== null) {
            clearTimeout(this.titleCheckTimeout);
        }
        this.titleCheckTimeout = setTimeout(() => {
            axios.post(`${config.serverUrl}/api/checkTitleExistence`, { title })
                .then((res) => {
                    if (res.data === 'titleExists') {
                        this.setState({ titleExists: "Title exist" });
                        this.setState({ buttonDisabledTitle: true });
                    } else if (res.data === 'titleDoesntExist') {
                        this.setState({ titleExists: "" });
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

    onSubmit(e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var description = this.state.description.trim();
        var is_deleted = this.state.is_deleted;
        var photo = this.state.photo;
        var tags = this.state.tags;
        var rating = this.state.rating;

        if (!title || !description || !photo ) {
            return;
        }
        this.props.handleSubmit({
            title,
            description,
            is_deleted,
            photo,
            tags,
            rating
        });
        this.setState({
            title: "",
            description: "",
            tags: "",

            buttonDisabledTitle: true,
            buttonDisabledDescription: true
        });
    }

    errorMessage = (m) => m === null ? '' : <div className="text-danger">{m}</div>;

    render() {
        let { imagePreviewUrl } = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<Thumbnail alt="171x180" src={imagePreviewUrl} />);
        }

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Create New Recipe</h1>
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
                <ButtonGroup justified>
                    <ButtonGroup>
                        <Button
                            type="submit"
                            bsStyle='success'
                            disabled={
                                this.state.buttonDisabledTitle ||
                                this.state.buttonDisabledDescription ||
                                this.state.buttonDisabledPhoto}
                        >
                            Create
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup className="btn-group">
                        <Link to="/recipes" className="btn btn-danger">Cancel</Link>
                    </ButtonGroup>
                </ButtonGroup>
            </form>
        );
    }
}

RecipesForm.PropTypes = {
    handleSubmit: PropTypes.func
};

export default RecipesForm;