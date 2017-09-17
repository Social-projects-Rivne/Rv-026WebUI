import axios from 'axios';
import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

class Header extends Component {
    handleClick(e) {
        e.preventDefault();
        axios.get('/api/logout')
        .then(res => {
            browserHistory.push('/');
        })
        .catch(err => {
            console.log(err.stack);
            console.log('Failed to log out');
        });
    }

    render(){
        return(
            <header>
                <h1>Header</h1>
                <Link className='btn btn-default' onClick={this.handleClick}>Log out</Link>

            </header>
        );
    }
}

export default Header;
