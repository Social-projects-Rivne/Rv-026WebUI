import React, { Component } from 'react';

import Header from '../../common/Header';

class SignUpSuccess extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1> Registration successful! </h1>
                <p> To confirm your credentials please visit the link we sent you via Email </p>
            </div>
        );
    }
}

export default SignUpSuccess;
