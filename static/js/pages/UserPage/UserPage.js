import React, { Component } from 'react';
import Result from './Result';
import Header from '../../common/Header';


class User extends Component {
   constructor() {
        super();
        this.state = { user: [] };
    }

    componentDidMount() {
        fetch(`/api/user/`, {method: 'GET', credentials: 'include' })
            .then(response => response.json())
            .then( ({rows: user }) => this.setState({user}))
            .catch( (error) => { console.log('profile parsing failed', error)})
    }

    render() {

      let user = this.state.user
      return(
        <div>
<<<<<<< HEAD
          <Result result={this.state.user} />
=======
          <Header />
          <Result result={this.state.user}/>
>>>>>>> develop
        </div>
      );
    }
}

export default User;
