import React, { Component } from 'react';
import Result from './Result';

class User extends React.Component {
   constructor() {
        super();
        this.state = { user: [] };
    }

    componentDidMount() {
        fetch(`http://localhost:3090/api/profile`)
            .then(response => response.json() )
            .then( ({rows: user }) => this.setState({user}))
    }

    render() {
      let user = this.state.user
      return(
        <div>
          <Result result={this.state.user}/>
        </div>
      );
    }
}

export default User;
