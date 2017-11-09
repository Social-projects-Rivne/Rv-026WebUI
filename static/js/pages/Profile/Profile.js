import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import wait from '../../common/wait';
import Result from './Result';
import Header from '../../common/Header';
import constants from '../../common/constants';
import {
    getUserInfo,
} from '../../actions/userAction';

class User extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { profile } = this.props;
        wait(2000)
        .then(() => {
            this.props.getUserInfo(profile);
        })
        .catch((err) => {
            console.log(err, 'Failed to get profile data');
        });
    }

    render() {
        const { process, profile } = this.props;
        if (process === 'fetching') {
            return (
                <div>
                    <Header />
                    <ReactLoading style={constants.centerDiv} type="bars" color="#444" height="70" width="20" />
                </div>
            );
        } else if (process === 'fetched') {
            return (
                <div>
                    <Header />
                    <Result result={this.props.profile} />
                </div>
            );
        } else if (process === 'failedToFetch') {
            return (
                <div>
                    <Header />
                    <h6>Failed to fetch your data :( </h6>
                </div>
            );
        }
    }
}

User.PropTypes = {
    getUserInfo: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        profile: state.profile.all,
        process: state.profile.process,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserInfo,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
