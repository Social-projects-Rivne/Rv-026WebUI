import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import wait from '../../common/wait';

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

class InlineEditRadio extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.userId;
        this.name = this.props.name;
        this.state = {
            value: '',
            role: this.props.role,
            role_id: this.props.role_id,
            editable: false,
            updateMessage: '',
            updateStatus: '',
            message: '',
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
            this.setState({ editable: false });
        }
    }

    handleSubmit(event) {
        this.setState({ process: 'fetching' });
        if (this.state.value !== 1) {
            this.setState({ editable: false });
            event.preventDefault();
            const radioValue = {
                value: this.state.value,
            };
            if (!radioValue.value) {
                radioValue.value = 2;
            }
            wait(2000)
            .then(() => {
                fetch(`/api/user/${this.id}/updateRole`, { method: 'PUT',
                    body: JSON.stringify(radioValue),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' })
                   .then((res) => { if (res.status === 200) { this.setState({ value: radioValue.value, updateMessage: 'Updated!', updateStatus: true, process: 'fetched' }); } else { this.setState({ value: this.state.role_id, updateMessage: 'Oooops! something wrong. Please try again later.', updateStatus: false, process: 'fetched',  }); } })
                   .then(setTimeout(() => this.setState({ updateMessage: '', updateStatus: false }), 2000))
                   .then(() => {
                       let val = '';
                       switch (Number(this.state.value)) {
                       case 1:
                           val = 'admin';
                           break;
                       case 2:
                           val = 'user';
                           break;
                       case 3:
                           val = 'cook';
                           break;
                       default:
                           val = 'user';
                           break;
                       }
                       this.setState({ role: val });
                   });
            })
            .catch((err) => {
                this.setState({ process: 'failedToFetch' });
                console.log(err, 'Failed to get image data');
            });
        } else {
            this.setState({ editable: true, message: 'Wrong user role!' });
        }
    }

    render() {
        if (this.state.editable) {
            return (
                <div>{this.name}:
                 <div className="formStyle">
                     <span> user </span> <input type="radio" name="role" value="2" onChange={this.handleChange} />
                     <span> cook </span> <input type="radio" name="role" value="3" onChange={this.handleChange} />
                     <input type="button" value="&#10004;" onClick={this.handleSubmit} className="updateButton" />
                     <input type="button" value="&#10008;" onClick={this.handleSwitch} className="cancelButton" />
                 </div>
                    <span className="warningMessage">{this.state.message}</span>
                </div>
            );
        } else if (this.state.process === 'fetching') {
            return (
                <div onClick={this.handleSwitch} role="button">
                    <p className="hoverInline">{this.name}: {this.state.role}</p>
                    <ReactLoading type="bars" color="#444" style={centerDiv} />
                </div>
            );
        } else {
            return (
                <div onClick={this.handleSwitch} role="button">
                    <p className="hoverInline">{this.name}: {this.state.role}</p>
                    {this.state.updateStatus ? (<span className="successMessage">{this.state.updateMessage}</span>) : (<span className="failedMessage">{this.state.updateMessage}</span>)}
                </div>
            );
        }
    }
}

InlineEditRadio.propTypes = {
    role: PropTypes.string,
    name: PropTypes.string,
    role_id: PropTypes.number,
    userId: PropTypes.number,
};

export default InlineEditRadio;
