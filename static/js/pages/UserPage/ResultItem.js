import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageEdit from './ImageEdit';
import InlineEditRadio from './InlineEditRadio';
import InlineEditText from './InlineEditText';

const hfStyle = {
    color: '#357786',
    padding: '20px 0',
};

class ResultItem extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="row UserComponent">
                <div className="col-sm-5 text-center">
                    <ImageEdit src={user.gravatar ? (user.gravatar) : ('/public/images/avatars/default-avatar.jpg')} value={user.gravatar ? (user.gravatar) : ('/public/images/avatars/default-avatar.jpg')} userId={user.owner_id} />
                    <InlineEditText value={user.fullname ? (user.fullname) : (user.email.split('@')[0])} userId={user.owner_id} dbName="fullname" />
                </div>
                <div className="col-sm-7">
                    <Tabs>
                        <TabList>
                            <Tab>User Info</Tab>
                            <Tab>Orders</Tab>
                        </TabList>
                        <TabPanel>
                            <h1 style={hfStyle}>Contact information:</h1>
                            <p>Email: {user.email}</p>
                            <InlineEditText value={user.phone_number} dbName="phone_number" name="Phone" userId={user.owner_id} />
                            <h1 style={hfStyle}>General information:</h1>
                            <InlineEditRadio role={user.user_role} role_id={user.role_id} name="Role" userId={user.owner_id} />
                            <InlineEditText value={user.about_me ? (user.about_me) : ('Enter something about yourself')} name="About" dbName="about_me" userId={user.owner_id} />
                            <p>Premium: {user.is_premium === true ? ('active') : ('none') }</p>
                        </TabPanel>
                        <TabPanel>
                            
                        </TabPanel>
                    </Tabs>
                </div>

            </div>
        );
    }
}

export default ResultItem;
