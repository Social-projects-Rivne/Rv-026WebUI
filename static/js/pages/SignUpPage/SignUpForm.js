import axios from 'axios';
import createHash from 'sha.js';
import { browserHistory, Link } from 'react-router';
import React, { Component } from 'react';
import { Button, FormControl, FormGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { ROLE_COOK, ROLE_USER } from '../../../../config';

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
                error: '*Required',
            },
            selectedOption: ROLE_USER,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
        this.errorsExist = this.errorsExist.bind(this);
    }

    setFieldValue(name, value) {
        this.setState({ [name]: { ...this.state[name], value } });
    }

    setFieldError(name, error) {
        this.setState({ [name]: { ...this.state[name], error } });
    }

    clearFieldError(name) {
        if (this.state[name].error !== null) {
            this.setState({ [name]: { ...this.state[name], error: null } });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const credentials = {};
        credentials.email = this.state.email.value;
        credentials.phone = this.state.phone.value;
        credentials.role = this.state.selectedOption;
        const sha256 = createHash('sha256');
        credentials.password = sha256.update(this.state.password.value, 'utf8').digest('hex');
        axios.post('/api/register', credentials)
        .then(() => {
            browserHistory.push('/signupsuccess');
        })
        .catch((err) => {
            console.log(err.stack);
            console.log('Failed to register');
        });
    }

    errorsExist() {
        const errors = [];
        Object.keys(this.state).forEach((key) => {
            if (this.state[key].error) {
                errors.push(this.state[key].error);
            }
        });

        if (errors.length === 0) return true;
        return false;
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

    handleOptionChange(e) {
        this.setState({ selectedOption: e.target.value });
    }

    handlePaste(e) {
        const obj = {
            target: {
                name: e.target.name,
                value: e.clipboardData.getData('Text'),
                validity: {
                    valueMissing: false,
                    valid: true,
                },
            },
        };
        this.handleChange(obj);
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
            if (!f.checked) {
                return new Error('*Required');
            }
            return true;
        },
    }

    errorMessage = m => (
        m !== null
            ? <div style={errorStyle} className="SignupForm--errorText">{m}</div>
            : ''
    )

    render() {
        return (

            <form style={formStyle} onSubmit={this.handleSubmit} noValidate autoComplete="off">

                <FormGroup>
                    <label htmlFor="SignupForm--email">Email</label>
                    <FormControl
                        type="email"
                        name="email"
                        id="SignupForm--email"
                        required
                        onChange={this.handleChange}
                        onPaste={this.handlePaste}
                        autoComplete="off"
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
                        onPaste={this.handlePaste}
                        autoComplete="off"
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
                        onPaste={this.handlePaste}
                        autoComplete="off"
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
                        onPaste={this.handlePaste}
                        autoComplete="off"
                    />
                    {this.errorMessage(this.state.passwordConfirm.error)}
                </FormGroup>

                <FormGroup>
                    <ButtonToolbar>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={ROLE_USER}>
                            <ToggleButton value={ROLE_USER} checked={this.state.selectedOption === ROLE_USER} onChange={this.handleOptionChange}>
                                User
                            </ToggleButton>
                            <ToggleButton value={ROLE_COOK} checked={this.state.selectedOption === ROLE_COOK} onChange={this.handleOptionChange}>
                                Cook
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
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

                <Button
                    bsStyle="primary"
                    type="submit"
                    disabled={!this.errorsExist()}
                >
                    Sign Up
                </Button>

            </form>
        );
    }
}
export default SignUpForm;
