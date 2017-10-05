import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import wait from '../../common/wait';

const avatarStyle = {
    borderRadius: 150,
    width: '100%',
    height: 'auto',
    maxHeight: '300px',
    maxWidth: '300px',
    margin: 'auto',
};

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

class ImageEdit extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.userId;
        this.state = {
            src: this.props.value,
            value: this.props.value,
            tempSrc: this.props.value,
            editable: false,
            message: '',
            updateMessage: '',
            updateStatus: '',
            process: '',
        };
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSwitch() {
        if (this.state.editable === false) {
            this.setState({ editable: true });
        } else {
            this.setState({ editable: false, value: this.state.tempSrc, message: '' });
        }
    }

    handleSubmit(event) {
        this.setState({ process: 'fetching' });
        if (this.state.value.length > 80) {
            this.setState({ message: 'Please, enter less than 80 symbols!' });
        } else if (!this.state.value.match(/(?:jpg|jpeg|gif|png|gif)$/)) {
            this.setState({ message: 'Please, enter link of picture!', value: this.state.tempSrc });
        } else if (this.state.value.length === 0 || this.state.tempSrc.length === 0) {
            this.setState({ value: '/public/images/avatars/default-avatar.jpg', tempSrc: '/public/images/avatars/default-avatar.jpg', editable: false });
        } else {
            this.setState({ value: this.state.value, editable: false, tempSrc: this.state.value, message: '' });
        }
        event.preventDefault();
        const ImageSrc = {
            value: this.state.value,
        };
        wait(2000)
        .then(() => {
            fetch(`/api/user/${this.id}/updateGravatar`, { method: 'PUT',
                body: JSON.stringify(ImageSrc),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include' })
            .then((res) => { if (res.status === 200) { this.setState({ updateMessage: 'Updated!', updateStatus: true, process: 'fetched' }); } else { this.setState({ value: this.state.src, process: 'fetched', updateMessage: 'Oooops! something wrong. Please try again later.', updateStatus: false }); } })
            .then(setTimeout(() => this.setState({ updateMessage: '', updateStatus: false }), 2000));
        })
        .catch((err) => {
            this.setState({ process: 'failedToFetch' });
            console.log(err, 'Failed to get image data');
        });
    }

    render() {
        if (this.state.editable) {
            return (
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
        }
        else if (this.state.process === 'fetching') {
            return (
                <div className="hoverInline" onClick={this.handleSwitch} role="button">
                    <img src={this.state.value} style={avatarStyle} alt="avatar" />
                    <ReactLoading type="bars" color="#444" style={centerDiv} />
                </div>
            );
        } else {
            return (
                <div className="hoverInline" onClick={this.handleSwitch} role="button">
                    <img src={this.state.value} style={avatarStyle} alt="avatar" />
                    {this.state.updateStatus ? (<span className="successMessage">{this.state.updateMessage}</span>) : (<span className="failedMessage">{this.state.updateMessage}</span>)}
                </div>
            );
        }
    }
}

ImageEdit.propTypes = {
    value: PropTypes.string,
    src: PropTypes.string,
    userId: PropTypes.number,
};

export default ImageEdit;
