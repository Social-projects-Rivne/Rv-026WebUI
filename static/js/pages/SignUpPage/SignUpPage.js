import React, { Component } from 'react';
import SignUpForm from './SignUpForm';

const formStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const h1Style = {
    textAlign: 'center'
}

class SignUpPage extends Component {
    render() {
        return(
            <div>
                <h1 style={h1Style}> Sign up </h1>
                <div style={formStyle}>
                    <SignUpForm/>
                </div>
            </div>
        );
    }
}

export default SignUpPage;
