import axios from 'axios';
import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import {Button, FormControl, FormGroup} from 'react-bootstrap';

const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px'
}

const formStyle = {
    width: '400px'
}

class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: {
                value: '',
                error: 'Required',
            },
            phone: {
                value: '',
                error: 'Required',
            },
            password: {
                value: '',
                error: 'Required',
            },
            passwordConfirm: {
                value: '',
                error: 'Required',
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        let errors = [];
        Object.keys(this.state).forEach((key) => {
            if (this.state[key].error) {
            errors.push(this.state[key].error);
            }
        });

        if (errors.length != 0) {
            console.log("invalid form")
        } else {
            let credentials = {};
            credentials.email = this.state.email.value;
            credentials.phone = this.state.phone.value;
            credentials.password = this.state.password.value;

            axios.post('/api/register', credentials)
            .then(res => true )
            .catch(err => {
                console.log(err.stack);
                console.log('Failed to register');
            });

            browserHistory.push('/signupsuccess');
        }
    }

    setFieldValue(name, value) {
        this.setState(Object.assign(this.state, {
            [name]: Object.assign(this.state[name], {
            value,
            })
        }));
    }

    //this.state[name].error=error
    setFieldError(name, error) {
        this.setState(Object.assign(this.state, {
            [name]: Object.assign(this.state[name], {
                error,
            })
        }));
    }

    clearFieldError(name) {
        if (this.state[name].error !== null) {
            this.setState(Object.assign(this.state, {
                [name]: Object.assign(this.state[name], {
                    error: null,
                })
            }));
        }
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        this.setFieldValue(name, target.value);
        if (this.checks[name]) {
            //this.checks[name] are anonymous and they dont have this, we pass it to them with call
            const result = this.checks[name].call(this, target);
            if (result instanceof Error) {
                this.setFieldError(name, result.message);
                } else {
                    this.clearFieldError(name);
                }
        }
    }

    emailCheckTimeout = null;

        checkEmailExists(email) {
        //debounce
        if (this.emailCheckTimeout !== null) {
        clearTimeout(this.emailCheckTimeout);
        }
        this.emailCheckTimeout = setTimeout(() => {
            axios.post('/api/checkEmailExistence', { email })
            .then((res) => {
                console.log(res.data);
                if (res.data === 'emailExists') {
                    this.setFieldError('email', 'Email already exists');
                } else if (res.data === 'emailDoesntExist') {
                    this.clearFieldError('email');
                } else {
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err.stack);
                console.log('Failed to check email');
            });
        }, 1000);
    }

    checks = {
        email: (f) => {
            if (f.validity.valueMissing) {
                return new Error('Required');
            }
            if (!f.validity.valid) {
                return new Error('Email is invalid');
            }
            this.checkEmailExists(f.value);
            return true;
        },

        password: (f) => {
            if (f.validity.valueMissing) {
                return new Error('Required');
            }
            return true;
        },

        passwordConfirm: (f) => {
            if (f.value !== this.state.password.value) {
                return new Error('Passwords do not match');
            }
            return true;
            },

        phone: (f) => {
            if (f.validity.valueMissing) {
                return new Error('Required');
            }
            return true;
        }
    }

    errorMessage = (m) => m === null ? '' : <div style={errorStyle} className="SignupForm--errorText">{m}</div>;

    render () {
        return (

            <form style={formStyle} onSubmit={this.handleSubmit} noValidate>

                <FormGroup>
                    <label htmlFor="SignupForm--email">Email</label>
                    <FormControl
                        ref="email"
                        type="email"
                        name="email"
                        id="SignupForm--email"
                        required
                        onChange={this.handleChange}
                        />
                    {this.errorMessage(this.state.email.error)}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="SignupForm--phone">Phone</label>
                    <FormControl
                        ref="phone"
                        type="text"
                        name="phone"
                        id="SignupForm--phone"
                        required
                        onChange={this.handleChange}
                        />
                    {this.errorMessage(this.state.phone.error)}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="SignupForm--password">Password</label>
                    <FormControl
                        ref="password"
                        type="password"
                        name="password"
                        id="SignupForm--password"
                        required
                        onChange={this.handleChange}
                        />
                    {this.errorMessage(this.state.password.error)}
                </FormGroup>

                <FormGroup>
                    <label htmlFor="SignupForm--password-confirmation">Password confirmation</label>
                    <FormControl
                        type="password"
                        ref="passwordConfirm"
                        name="passwordConfirm"
                        id="SignupForm--password-confirmation"
                        onChange={this.handleChange}
                        />
                    {this.errorMessage(this.state.passwordConfirm.error)}
                </FormGroup>

                <Button bsStyle='primary' type='submit' >Sign Up</Button>

        </form>
        );
    }
}
export default SignUpForm;
