import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import switchColorToElement from './switchColorToElement';
import switchButtonToStatus from './switchButtonToStatus';
import {
    ROLE_COOK, ROLE_USER,
    STATUS_NEW, STATUS_TAKEN, STATUS_READY, STATUS_DELIVERED, STATUS_PAID, STATUS_CANCELED, STATUS_REOPENED,
    BUTTON_NEW, BUTTON_TAKE, BUTTON_READY, BUTTON_DELIVER, BUTTON_PAY, BUTTON_CANCEL, BUTTON_REOPEN,
} from '../../../../config';

class ChangeStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                this.setState({ displayed: [BUTTON_TAKE], messageCook: '' });
                break;
            case STATUS_TAKEN:
                this.setState({ displayed: [BUTTON_READY, BUTTON_CANCEL], messageCook: '' });
                break;
            case STATUS_READY:
                this.setState({ displayed: [], messageCook: 'wait, dish cooking' });
                break;
            case STATUS_DELIVERED:
                this.setState({ displayed: [BUTTON_PAY], messageCook: '' });
                break;
            case STATUS_PAID:
                this.setState({ displayed: [], messageCook: 'success!' });
                break;
            case STATUS_CANCELED:
                this.setState({ displayed: [BUTTON_REOPEN], messageCook: '' });
                break;
            case STATUS_REOPENED:
                this.setState({ displayed: [BUTTON_NEW], messageCook: '' });
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
                this.setState({ displayed: [BUTTON_CANCEL], messageUser: '' });
                break;
            case STATUS_TAKEN:
                this.setState({ displayed: [], messageUser: 'your dish is taken' });
                break;
            case STATUS_READY:
                this.setState({ displayed: [BUTTON_DELIVER], messageUser: '' });
                break;
            case STATUS_DELIVERED:
                this.setState({ displayed: [], messageUser: 'wait, confirms the payment' });
                break;
            case STATUS_PAID:
                this.setState({ displayed: [], messageUser: 'success!' });
                break;
            case STATUS_CANCELED:
                this.setState({ displayed: [BUTTON_REOPEN], messageUser: '' });
                break;
            case STATUS_REOPENED:
                this.setState({ displayed: [BUTTON_NEW], messageUser: '' });
                break;
            default:
                break;
            }
        }
    }

    handleClick(button) {
        let { orderId, role, status } = this.props;
        const currentStatus = switchButtonToStatus(button);
        
        this.displayedForCook(role, currentStatus);
        this.displayedForUser(role, currentStatus);
        this.props.onStatusSubmit({ currentStatus, orderId });
    }

    renderMessage(messageUser, messageCook) {
        if (messageUser || messageCook) {
            return (
                <div>
                    <div className="talk-container">
                        <div className="talk-bubble tri-right round border right-top">
                            <div className="talktext">
                                <p>{messageUser || messageCook}</p>
                            </div>
                        </div>
                    </div>
                    <div className="image-container">
                        <img className="image" alt="cook" src={messageCook ? '/public/images/common/cook.png' : '/public/images/common/user.jpg'} />
                    </div>
                </div>
            );
        }
        return (null);
    }

    render() {
        const { messageUser, messageCook } = this.state;
        let buttonList = this.state.displayed;
        if (!_.isEmpty(this.state.displayed)) {
            buttonList = buttonList.map((button, index) => {
                const color = switchColorToElement(button);
                return (
                    <button
                        style={{ backgroundColor: color }}
                        key={index}
                        onClick={() => this.handleClick(button)}
                        className="status-btn"
                    >
                        {button}
                    </button>
                );
            });
        }
//якщо кук то messageCook компонента
        return (
            <div>
                {buttonList}
                
                {this.renderMessage(messageUser, messageCook)}
                


                
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
