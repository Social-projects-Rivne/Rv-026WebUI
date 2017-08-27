import React, { Component } from 'react';
import { Link } from 'react-router';

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
            imagePreview = (<img src={imagePreviewUrl} />);
        }

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text"
                           placeholder="Title recipe"
                           value={this.state.title}
                           onChange={this.onTitleChange} 
                    />
                    <input type="text"
                           placeholder="Description recipe"
                           value={this.state.description}
                           onChange={this.onDescriptionChange} 
                    />
                    <input type="file"
                           onChange={this.onPhotoChange}
                           accept="image/x-png,image/gif,image/jpeg" 
                    />
                    <div className="btn-group btn-group-justified">
                        <div className="btn-group">
                            <button type="submit" className="btn btn-success">Create</button>
                        </div>
                        <div className="btn-group">
                            <Link to="/recipes" className="btn btn-danger">Cancel</Link>
                        </div>
                    </div>
                </form>
                {imagePreview}
            </div>
        );
    }
}

export default RecipesForm;