import React, { Component } from 'react';

import ImageEdit from './ImageEdit';
import InlineEditRadio from './InlineEditRadio';
import InlineEditText from './InlineEditText';

const hfStyle = {
    color: '#357786',
    padding: '20px 0'
}

class ResultItem extends Component{
    render(){
        var user = this.props.user;
        return(
          <div className="row UserComponent">
            <div className="col-sm-5 text-center">
            <ImageEdit src={user.gravatar ? ( user.gravatar ) : (`/public/images/avatars/default-avatar.jpg`)} value={user.gravatar ? ( user.gravatar ) : (`/public/images/avatars/default-avatar.jpg`)} userId={user.id} />
            <InlineEditText value={user.fullname ? (user.fullname ) : ('Enter your name')} userId={user.id} dbName="fullname"/>
            </div>
            <div className="col-sm-7">
              <h1 style={hfStyle}>Contact information:</h1>
              <InlineEditText value={user.email} dbName="email" name="Email" userId={user.id} />
              <InlineEditText value={user.phone_number} dbName="phone_number" name="Phone" userId={user.id} />
              <h1 style={hfStyle}>General information:</h1>
              <InlineEditRadio role={user.user_role} role_id={user.role_id} name="Role" userId={user.id} />
              <InlineEditText value={ user.about_me ? (user.about_me ) : ( 'Enter something about yourself')} name="About" dbName="about_me" name="About" userId={user.id}/>
              <p>Premium: {user.is_premium == true ? ('active') : ('none') }</p>
            </div>
          </div>
        );
    }
}

export default ResultItem;
