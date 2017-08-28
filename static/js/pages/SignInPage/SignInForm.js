import axios from 'axios';
import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px'
}

const formStyle = {
    width: '400px'
}

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: 'Email and password required'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        let credentials = {};
        credentials.email = this.state.email;
        credentials.password = this.state.password;

        axios.post('/api/login', credentials)
        .then(res => {
            if (res.data === 'ok') {
                this.clearFieldError();
                browserHistory.push('/');
            } else {
                this.setFieldError(res.data);
            }
        })
        .catch(err => {
            console.log(err.stack);
            console.log('Failed to log in');
        });
    }

    setFieldValue(name, value) {
        this.setState(Object.assign(this.state, {
            [name]: value
        }));
    }

    setFieldError(error) {
        this.setState(Object.assign(this.state, {
            error,
        }));
    }

    clearFieldError() {
            this.setState(Object.assign(this.state, {
                error: '',
            }));
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        this.setFieldValue(name, target.value);
    }

    errorMessage = (m) => m === null ? <div style={{display:'inline-block'}}> </div> : <div style={errorStyle} className="SignupForm--errorText">{m}</div>;

    render () {
        return (
            <form style={formStyle} onSubmit={this.handleSubmit} noValidate>

                <FormGroup>
                    <label htmlFor="SigninForm--email">Email</label>
                    <FormControl
                        ref="email"
                        type="email"
                        name="email"
                        id="SigninForm--email"
                        required
                        onChange={this.handleChange}
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
                        />
                        {this.errorMessage(this.state.error)}
                </FormGroup>

                <Button bsStyle='primary' type='submit' >Sign In</Button>

        </form>
        );
    }
}

export default SignInForm;
