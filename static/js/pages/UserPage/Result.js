import React, { Component } from 'react';
import constants from '../../common/constants';

class Result extends Component {
    render() {
        const user = this.props.result.map((result) => {
            return (
                <div className="row UserComponent" key={result.id}>
                    <div className="col-sm-12 text-center">
                        <img src={result.gravatar ? (result.gravatar) : ('/public/images/avatars/default-avatar.jpg')} alt="avatar" style={constants.avatarStyle} />
                        <h2>{result.fullname ? result.fullname : result.email.split('@')[0] }</h2>
                    </div>
                    <div className="col-sm-offset-4 col-sm-4">
                        <h1 style={constants.hfStyle}>Contact information:</h1>
                        <p>Email: {result.email}</p>
                        <p> Phone: {result.phone_number ? result.phone_number : 'none' } </p>
                        <h1 style={constants.hfStyle}>General information:</h1>
                        <p> About: {result.about_me ? result.about_me : 'none' } </p>
                        <p>Premium: {result.is_premium === true ? 'active' : 'none' }</p>
                    </div>
                </div>
            );
        });
        return (
            <div className="container">
                {user}
            </div>
        );
    }
}

export default Result;
