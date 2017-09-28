import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import wait from '../../common/wait';

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

class InlineEditText extends Component {
    constructor(props) {
        super(props);
        this.dbName = this.props.dbName;
        this.name = this.props.name;
        this.id = this.props.userId;
        this.state = {
            value: this.props.value,
            temVal: this.props.value,
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
        this.setState({ temVal: event.target.value });
    }

    handleSwitch() {
        if (this.state.editable === false) {
            this.setState({ editable: true });
        } else {
            this.setState({ editable: false, temVal: this.state.value, message: '' });
        }
    }

    handleSubmit(event) {
        this.setState({ process: 'fetching' });
        if (this.state.temVal.length === 0) {
            this.setState({ message: 'Please, enter something!' });
        } else if (this.props.dbName === 'phone_number' && this.state.temVal.length > 24) {
            this.setState({ message: 'Please, enter less than 24 symbols!' });
        } else if (this.props.dbName === 'fullname' && this.state.temVal.length > 64) {
            this.setState({ message: 'Please, enter less than 64 symbols!' });
        } else {
            this.setState({ value: this.state.temVal, editable: false, message: '' });
            event.preventDefault();
            const textField = {
                value: this.state.temVal,
                dbName: this.props.dbName,
            };
            wait(2000)
            .then(() => {
                fetch(`/api/user/${this.id}/updateProfile`, { method: 'PUT',
                    body: JSON.stringify(textField),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' })
                   .then((res) => { if (res.status === 200) { this.setState({ updateMessage: 'Updated!', updateStatus: true, process: 'fetched' }); } else { this.setState({ process: 'fetched', updateMessage: 'Oooops! something wrong. Please try again later.', updateStatus: false }); } })
                   .then(setTimeout(() => this.setState({ updateMessage: '', updateStatus: false }), 2000));
            })
            .catch((err) => {
                this.setState({ process: 'failedToFetch' });
                console.log(err, 'Failed to get image data');
            });
        }
    }

    render() {
        if (this.state.editable) {
            return (
                <div>{this.dbName === 'fullname' ? ('') : (`${this.name}: `)}
                    <div className="formStyle">
                        {this.dbName === 'about_me' ? (<textarea value={this.state.temVal} onChange={this.handleChange} className="form-control" />) :
                        (<input type="text" value={this.state.temVal} onChange={this.handleChange} className="form-control" />)}
                        <input type="button" value="&#10004;" onClick={this.handleSubmit} className="updateButton" />
                        <input type="button" value="&#10008;" onClick={this.handleSwitch} className="cancelButton" />
                    </div>
                    <span className="warningMessage">{this.state.message}</span>
                </div>
            );
        } else if (this.state.process === 'fetching') {
            return (
                <div onClick={this.handleSwitch} role="button">
                    {this.dbName === 'fullname' ? (<h2 className="hoverInline" >{this.state.value}</h2>) :
                    (<p className="hoverInline">{this.name}: {this.state.value}</p>)}
                    <ReactLoading type="bars" color="#444" style={centerDiv} />
                </div>
            );
        } else {
            return (
                <div onClick={this.handleSwitch} role="button">
                    {this.dbName === 'fullname' ? (<h2 className="hoverInline" >{this.state.value}</h2>) :
                    (<p className="hoverInline">{this.name}: {this.state.value}</p>)}
                    {this.state.updateStatus ? (<span className="successMessage">{this.state.updateMessage}</span>) : (<span className="failedMessage">{this.state.updateMessage}</span>)}
                </div>
            );
        }
    }
}

InlineEditText.propTypes = {
    value: PropTypes.string,
    userId: PropTypes.number,
    dbName: PropTypes.string,
    name: PropTypes.string,
};

export default InlineEditText;
