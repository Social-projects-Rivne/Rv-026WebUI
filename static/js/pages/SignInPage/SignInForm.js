import axios from 'axios';
import createHash from 'sha.js';
import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

const errorStyle = {
    fontSize: '12px',
    marginTop: '5px',
};

const formStyle = {
    width: '400px',
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: {
                value: '',
                error: true,
            },
            password: {
                value: '',
                error: true,
            },
            error: '*Email and password are required',
            serverError: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const credentials = {};

        credentials.email = this.state.email.value;
        const sha256 = createHash('sha256');
        credentials.password = sha256.update(this.state.password.value, 'utf8').digest('hex');

        axios.post('/api/login', credentials)
        .then((res) => {
            if (res.data === 'ok') {
                browserHistory.push('/');
            } else {
                this.setState({ serverError: `*${res.data}` });
            }
        })
        .catch((err) => {
            console.log(err.stack);
            console.log('Failed to log in');
        });
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        const errors = {};
        errors.email = target.name === 'email'
            ? target.validity.valueMissing
            : this.state.email.error;
        errors.password = target.name === 'password'
            ? target.validity.valueMissing
            : this.state.password.error;
        const error = this.getFormError(errors.email, errors.password);

        this.setState(
            {
                [name]: {
                    value: target.value,
                    error: errors[target.name],
                },
                error,
                serverError: '',
            },
        );
    }

    getFormError = (emailError, passwordError) => {
        if (emailError && passwordError) {
            return 'Email and password are required';
        }
        if (emailError) {
            return 'Email is required';
        }
        if (passwordError) {
            return 'Password is required';
        }
        return '';
    }

    errorMessage = m => m === null ? <div style={{ display: 'inline-block' }}> </div> : <div style={errorStyle} className="SignupForm--errorText">{m}</div>;

    render() {
        return (
            <form style={formStyle} onSubmit={this.handleSubmit} noValidate autoComplete="off">

                <FormGroup>
                    <label htmlFor="SigninForm--email">Email</label>
                    <FormControl
                        ref="email"
                        type="email"
                        name="email"
                        id="SigninForm--email"
                        required
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="SigninForm--password">Password</label>
                    <FormControl
                        ref="password"
                        type="password"
                        name="password"
                        id="SigninForm--password"
                        required
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    {this.errorMessage(this.state.serverError || this.state.error)}
                </FormGroup>

                <Button
                    bsStyle="primary"
                    type="submit"
                    disabled={this.state.error !== ''}
                >
                Sign In
                </Button>

            </form>
        );
    }
}

export default SignInForm;
