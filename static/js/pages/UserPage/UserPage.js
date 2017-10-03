import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import wait from '../../common/wait';
import Result from './Result';
import Header from '../../common/Header';

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

class User extends Component {
    constructor() {
        super();
        this.state = { user: [], process: 'fetching' };
    }

    componentWillMount() {
        wait(2000)
        .then(() => {
            fetch('/api/user/', { method: 'GET', credentials: 'include' })
                .then(response => response.json(), this.setState({ process: 'fetched' }))
                .then(({ rows: user }) => this.setState({ user }));
        })
            .catch((err) => {
                this.setState({ process: 'failedToFetch' });
                console.log(err, 'Failed to get profile data');
            });
    }

    render() {
        const user = this.state.user;
        const phase = this.state.process;
        if (phase === 'fetching') {
            return (
                <div>
                    <Header />
                    <ReactLoading style={centerDiv} type="bars" color="#444" height="70" width="20" />
                </div>
            );
        } else if (phase === 'fetched') {
            return (
                <div>
                    <Header />
                    <Result result={user} />
                </div>
            );
        } else if (phase === 'failedToFetch') {
            return (
                <div>
                    <Header />
                    <h6>Failed to fetch your data :( </h6>
                </div>
            );
        }
    }
}

export default User;
