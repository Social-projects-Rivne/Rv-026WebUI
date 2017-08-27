import React, { Component } from 'react';
import { Link } from 'react-router';
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
            owner_id: 1,
            photo: "",
            imagePreviewUrl: "",
            rating: 0
        }
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPhotoChange = this.onPhotoChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onTitleChange(e) {
        this.setState({title: e.target.value});
    }

    onDescriptionChange(e) {
        this.setState({description: e.target.value});
    }

    onPhotoChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
          this.setState({
            photo: file,
            imagePreviewUrl: reader.result
          });
        }

        reader.readAsDataURL(file)
    }

    onSubmit(e){
        e.preventDefault();
        var title = this.state.title.trim();
        var description = this.state.description.trim();
        var is_deleted = this.state.is_deleted;
        var owner_id = this.state.owner_id;
        var photo = this.state.photo;
        var rating = this.state.rating;
        if(!title || !description || !photo || !owner_id) {
            return;
        }
        this.props.handleSubmit({
            title,
            description,
            is_deleted,
            owner_id,
            photo,
            rating
        });
        this.setState({
            title:"",
            description:"",
            owner_id:null,
            photo:"no image",
        });
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if(imagePreviewUrl){
            imagePreview = (<Thumbnail alt="171x180" src={imagePreviewUrl} />);
        }

        return (
            <form onSubmit={this.onSubmit}>
                <FormGroup>
                    <label htmlFor="RecipesForm--title">Title</label>
                    <FormControl
                        type="text"
                        name="title"
                        id="RecipesForm--title"
                        required
                        placeholder="Title recipe"
                        value={this.state.title}
                        onChange={this.onTitleChange} 
                />
                    
                </FormGroup>
                <FormGroup>
                    <label htmlFor="RecipesForm--description">Description</label>
                    <FormControl
                        componentClass="textarea" 
                        name="description"
                        id="RecipesForm--description"
                        required
                        placeholder="Description recipe"
                        value={this.state.description}
                        onChange={this.onDescriptionChange} 
                    />
                    
                </FormGroup>
                <FormGroup>
                    <label htmlFor="RecipesForm--photo">Photo</label>
                    <FormControl
                        type="file"
                        name="photo"
                        id="RecipesForm--photo"
                        required
                        onChange={this.onPhotoChange} 
                        accept="image/x-png,image/gif,image/jpeg"
                    />
                    
                </FormGroup>
                {imagePreview}
                <ButtonGroup justified>
                    <ButtonGroup>
                        <Button type="submit" bsStyle='success'>Create</Button>
                    </ButtonGroup>
                    <ButtonGroup className="btn-group">
                        <Link to="/recipes" className="btn btn-danger">Cancel</Link>
                    </ButtonGroup>
                </ButtonGroup>
            </form>
        );
    }
}

export default RecipesForm;