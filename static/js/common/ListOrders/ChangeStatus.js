import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import {
    ROLE_COOK,
    ROLE_USER,
    STATUS_NEW,
    STATUS_TAKEN,
    STATUS_READY,
    STATUS_DELIVERED,
    STATUS_PAID,
    STATUS_CANCELED,
} from '../../../../config';

class ChangeStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            displayed: [],
            messageCook: '',
            messageUser: '',
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        const { role, status } = this.props;
        this.displayedForCook(role, status);
        this.displayedForUser(role, status);
    }

    displayedForCook(role, status) {
        if (role === ROLE_COOK) {
            switch (status) {
            case STATUS_NEW:
                this.setState({ displayed: [STATUS_TAKEN], messageCook: '' });
                break;
            case STATUS_TAKEN:
                this.setState({ displayed: [STATUS_READY, STATUS_CANCELED], messageCook: '' });
                break;
            case STATUS_READY:
                this.setState({ displayed: [], messageCook: 'wait, dish cooking' });
                break;
            case STATUS_DELIVERED:
                this.setState({ displayed: [STATUS_PAID], messageCook: '' });
                break;
            case STATUS_PAID:
                this.setState({ displayed: [], messageCook: 'success!' });
                break;
            default:
                break;
            }
        }
    }

    displayedForUser(role, status) {
        if (role === ROLE_USER) {
            switch (status) {
            case STATUS_NEW:
                this.setState({ displayed: [STATUS_CANCELED], messageUser: '' });
                break;
            case STATUS_TAKEN:
                this.setState({ displayed: [], messageUser: 'your dish is taken' });
                break;
            case STATUS_READY:
                this.setState({ displayed: [STATUS_DELIVERED], messageUser: '' });
                break;
            case STATUS_DELIVERED:
                this.setState({ displayed: [], messageUser: 'wait, confirms the payment' });
                break;
            case STATUS_PAID:
                this.setState({ displayed: [], messageUser: 'success!' });
                break;
            default:
                break;
            }
        }
    }

    handleClick(button) {
        console.log('Test Click', button);
    }

    render() {
        const { messageUser, messageCook } = this.state;
        let buttonList = this.state.displayed;
        if (!_.isEmpty(this.state.displayed)) {
            buttonList = buttonList.map((button, index) =>
                <button
                    key={index}
                    onClick={() => this.handleClick(button)}
                    className="btn btn-success"
                >
                    {button}
                </button>,
            );
        }

        return (
            <div>
                {buttonList}
                {messageCook}
                {messageUser}
            </div>
        );
    }
}

ChangeStatus.PropTypes = {
    role: PropTypes.string,
    orderId: PropTypes.number,
    status: PropTypes.string,
};

export default ChangeStatus;
