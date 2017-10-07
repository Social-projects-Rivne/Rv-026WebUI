import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageEdit from './ImageEdit';
import InlineEditRadio from './InlineEditRadio';
import InlineEditText from './InlineEditText';
import ListComponent from './ListComponent';
import constants from '../../common/constants';

class Result extends Component {
    render() {
        const profile = this.props.result.map((result) => {
            return (
                <div className="row UserComponent" key={result.id}>
                    <div className="col-sm-5 text-center">
                        <ImageEdit src={result.gravatar ? (result.gravatar) : ('/public/images/avatars/default-avatar.jpg')} value={result.gravatar ? (result.gravatar) : ('/public/images/avatars/default-avatar.jpg')} userId={result.id} />
                        <InlineEditText value={result.fullname ? (result.fullname) : (result.email.split('@')[0])} userId={result.id} dbName="fullname" />
                    </div>
                    <div className="col-sm-7">
                        <Tabs>
                            <TabList>
                                <Tab>User Info</Tab>
                                <Tab>Orders</Tab>
                            </TabList>
                            <TabPanel>
                                <h1 style={constants.hfStyle}>Contact information:</h1>
                                <p>Email: {result.email}</p>
                                <InlineEditText value={result.phone_number} dbName="phone_number" name="Phone" userId={result.id} />
                                <h1 style={constants.hfStyle}>General information:</h1>
                                <InlineEditRadio role={result.user_role} role_id={result.role_id} name="Role" userId={result.id} />
                                <InlineEditText value={result.about_me ? (result.about_me) : ('Enter something about yourself')} name="About" dbName="about_me" userId={result.id} />
                                <p>Premium: {result.is_premium === true ? ('active') : ('none') }</p>
                            </TabPanel>
                            <TabPanel>
                                <ListComponent userId={result.id} role_id={result.role_id} />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            );
        });
        return (
            <div className="container">
                {profile}
            </div>
        );
    }
}

export default Result;
