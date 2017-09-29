import React, { Component } from 'react';
import Header from '../Header';

class NotFound extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1 className="text-center">404 <small>Not Found :(</small> </h1>
                <h2 className="text-center">Please go to the <a href="/">homepage</a> </h2>
            </div>
        );
    }
}

export default NotFound;
