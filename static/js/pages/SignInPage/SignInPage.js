import React, { Component } from 'react';
import SignInForm from './SignInForm';
import Header from '../../common/Header';

const formStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const h1Style = {
    textAlign: 'center',
};

class SignInPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1 style={h1Style}> Sign in </h1>
                <div style={formStyle}>
                    <SignInForm />
                </div>
            </div>
        );
    }
}

export default SignInPage;
