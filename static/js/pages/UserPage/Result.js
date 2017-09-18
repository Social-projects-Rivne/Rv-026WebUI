import React, { Component } from 'react';

const avatarStyle = {
    borderRadius: 150,
    width: '100%',
    height: 'auto',
    maxHeight: '300px',
    maxWidth: '300px',
    margin: 'auto'
}

const hfStyle = {
    color: '#357786',
    padding: '20px 0'
}

const nameStyle = {
    color: '#357786',
    padding: '20px',
    textAlign: 'center'
}




class Result extends React.Component{
    render() {
      var profile = this.props.result.map(function(result,index){
            return <ResultItem key={index} user={result} />
        });
        return(
            <div className="container">
                {profile}
            </div>
        );
    }
}

class ResultItem extends React.Component{
    render(){
        var user = this.props.user;
        user.is_premium == false ? user.is_premium = "none" : user.is_premium = "active";
        return(
          <div className="row">
            <div className="col-sm-5 text-center">
              <img src={user.gravatar} alt="avatar" style={avatarStyle}/>
              <h2 style={nameStyle}>{user.fullname}</h2>
            </div>
            <div className="col-sm-7">
              <h1 style={hfStyle}>Contact information:</h1>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone_number}</p>
              <h1 style={hfStyle}>General information:</h1>
              <p>Role: {user.user_role}</p>
              <p>About: {user.about_me}</p>
              <p>Premium: {user.is_premium}</p>
            </div>
          </div>
        );
    }
}

export default Result;
