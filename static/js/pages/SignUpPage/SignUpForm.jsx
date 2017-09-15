import axios from 'axios';
import createHash from 'sha.js';
import { browserHistory, Link } from 'react-router';
import React, { Component } from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

const errorStyle = {
    fontSize: '12px',
    marginTop: '5px',
};

const formStyle = {
    width: '400px',
};

class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: {
                value: '',
                error: '*Required',
            },
            phone: {
                value: '',
                error: '*Required',
            },
            password: {
                value: '',
                error: '*Required',
            },
            passwordConfirm: {
                value: '',
                error: '*Required',
            },
            terms: {
                value: '',
                error: '*Required'
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
    }

    setFieldValue(name, value) {
        this.setState(Object.assign(this.state, {
            [name]: Object.assign(this.state[name], {
                value,
            }),
        }));
    }

    setFieldError(name, error) {
        this.setState(Object.assign(this.state, {
            [name]: Object.assign(this.state[name], {
                error,
            }),
        }));
    }

    handleSubmit(e) {
        e.preventDefault();

        const errors = [];
        Object.keys(this.state).forEach((key) => {
            if (this.state[key].error) {
                errors.push(this.state[key].error);
            }
        });

        if (errors.length !== 0) {
            console.log('invalid form');
        } else {
            let credentials = {};
            credentials.email = this.state.email.value;
            credentials.phone = this.state.phone.value;
            const sha256 = createHash('sha256');
            credentials.password = sha256.update(this.state.password.value, 'utf8').digest('hex');

            axios.post('/api/register', credentials)
            .then((res) => {
                browserHistory.push('/signupsuccess');
            })
            .catch((err) => {
                console.log(err.stack);
                console.log('Failed to register');
            });

        }
    }

    setFieldValue(name, value) {
        this.setState({ [name]: {...this.state[name],value,} });
    }

    setFieldError(name, error) {
        this.setState({ [name]: {...this.state[name],error,} })
    }

    clearFieldError(name) {
        if (this.state[name].error !== null) {
            this.setState({ [name]: {
                ...this.state[name],
                error: null,
                }
            })
        }
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        this.setFieldValue(name, target.value);
        if (this.checks[name]) {
            // this.checks[name] are anonymous and they dont have this, we pass it to them with call
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
        // debounce
        if (this.emailCheckTimeout !== null) {
            clearTimeout(this.emailCheckTimeout);
        }
        this.emailCheckTimeout = setTimeout(() => {
            axios.post('/api/checkEmailExistence', { email })
            .then((res) => {
                if (res.data === 'emailExists') {
                    this.setFieldError('email', '*Email already exists');
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
                return new Error('*Required');
            }
            if (!f.validity.valid) {
                return new Error('*Email is invalid');
            }
            this.checkEmailExists(f.value);
            return true;
        },

        password: (f) => {
            if (f.validity.valueMissing) {
                return new Error('*Required');
            }
            return true;
        },

        passwordConfirm: (f) => {
            if (f.value !== this.state.password.value) {
                return new Error('*Passwords do not match');
            }
            return true;
        },

        phone: (f) => {
            if (f.validity.valueMissing) {
                return new Error('*Required');
            }
            return true;
        },

        terms: (f) => {
            if (!f.checked){
                return new Error('*Required');
            }
            return true;
        },
    }

    errorMessage = m => (
        m !== null
            ? <div style={errorStyle} className="SignupForm--errorText">{m}</div>
            : ''
    );

    render() {
        return (

            <form style={formStyle} onSubmit={this.handleSubmit} noValidate>

                <FormGroup>
                    <label htmlFor="SignupForm--email">Email</label>
                    <FormControl
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
                        name="passwordConfirm"
                        id="SignupForm--password-confirmation"
                        onChange={this.handleChange}
                    />
                    {this.errorMessage(this.state.passwordConfirm.error)}
                </FormGroup>

                <FormGroup>
                    <input
                        type="checkbox"
                        name="terms"
                        id="SignupForm--terms"
                        onClick={this.handleChange}
                    />
                    <span>I agree to the <Link to="/terms"> Terms and Conditions</Link></span>
                    {this.errorMessage(this.state.terms.error)}
                </FormGroup>

                <Button bsStyle="primary" type="submit" >Sign Up</Button>

            </form>
        );
    }
}
export default SignUpForm;
