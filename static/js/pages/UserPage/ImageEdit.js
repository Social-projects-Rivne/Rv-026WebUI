import React, {Component} from 'react';
import PropTypes from 'prop-types';

const avatarStyle = {
    borderRadius: 150,
    width: '100%',
    height: 'auto',
    maxHeight: '300px',
    maxWidth: '300px',
    margin: 'auto'
}

class ImageEdit extends Component {

  constructor (props) {
    super(props);
    this.id = this.props.userId,
    this.state = {
      src: this.props.value,
      value: this.props.value,
      tempSrc: this.props.value,
      editable: '',
      message: '',
      updateMessage: '',
      updateStatus: ''
    }

    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSwitch(event) {
    if( this.state.editable == false){
      this.setState({editable: true});
    }
    else {
      this.setState({editable: false, value: this.state.tempSrc, message: '' });
    }
  }

  handleSubmit(event) {
    if(this.state.value.length > 80) {
      this.setState({message: "Please, enter less than 80 symbols!" });
    } else if (!this.state.value.match(/(?:jpg|jpeg|gif|png|gif)$/)) {
      this.setState({message: "Please, enter link of picture!", value: this.state.tempSrc})
    } else {
      if(this.state.value.length == 0 || this.state.tempSrc.length == 0){
        this.setState({value: `/public/images/avatars/default-avatar.jpg`, tempSrc: `/public/images/avatars/default-avatar.jpg`, editable: false})
      } else {
        this.setState({value: this.state.value, editable: false, tempSrc: this.state.value, message: ''})
      }
      event.preventDefault();
      let ImageSrc = {
        value: this.state.value
      }
      fetch(`/api/user/${this.id}/updateGravatar`, {method: 'PUT',   body: JSON.stringify(ImageSrc), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, credentials: 'include' })
          .then(response => { response.json() })
          .then(this.setState({updateMessage: "Updated!", updateStatus: true}))
          .then( setTimeout(() => this.setState({updateMessage: " ", updateStatus: false}), 1000))
          .catch(error => console.log(error) );
    }
   }

  render() {
    if (this.state.editable) return (
            <div>
              <h3> Upload Your Gravatar </h3>
              <img src={this.state.value} style={avatarStyle} />
              <div className="formStyle">
                <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" />
                <input type="button" value="&#10004;" onClick={this.handleSubmit} className="updateButton" />
                <input type="button" value="&#10008;" onClick={this.handleSwitch} className="cancelButton" />
              </div>
              <span className="warningMessage">{this.state.message}</span>
            </div>
      );
    return (
            <p onClick={this.handleSwitch}>
              <img  src={this.state.value} style={avatarStyle} />
              {this.state.updateStatus ? ( <span className="successMessage">{this.state.updateMessage}</span>) : ( <span className="failedMessage">{this.state.updateMessage}</span> )}
            </p>
    )
  }
}

ImageEdit.propTypes = {
  value: PropTypes.string,
  src: PropTypes.string,
  userId: PropTypes.number
}

export default ImageEdit;
