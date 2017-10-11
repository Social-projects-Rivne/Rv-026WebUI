import React, { Component } from 'react';

class ButtonStatus extends Component {
    constructor(props) {
        super(props);
        this.role_id = this.props.role_id;
        this.id = this.props.id;
        this.order_id = this.props.order_id;
        this.state = {
            buttonStatus: '',
            status_id: this.props.status_id,
            updateMessage: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    buttonChange(role, status) {
        let textButton;
        let button;
        if (this.role_id === 3) {
            if (this.state.status_id === 2) {
                textButton = 'Change to ready';
                button = "disable";
            } else if (this.state.status_id === 4) {
                textButton = 'Change to paid';
            }
        } else if (this.role_id === 2) {
            if (this.state.status_id === 3) {
                textButton = 'Change to delivered';
            } else if (this.state.status_id === 5) {
                textButton = 'Change to canceled';
            }
        }
        return textButton;
    }

    handleSubmit(event) {
        if (this.role_id === 3) {
            if (this.state.status_id === 2) {
                this.setState({ status_id: 3 });
            } else if (this.state.status_id === 4) {
                this.setState({ status_id: 5 });
            }
        } else if (this.role_id === 2) {
            if (this.state.status_id === 3) {
                this.setState({ status_id: 4 });
            } else if (this.state.status_id === 5) {
                this.setState({ status_id: 6 });
            }
        }

        event.preventDefault();
        const statusId = {
            value: this.state.status_id,
            id: this.id,
            order: this.order_id,
            role: this.role_id,
        }
        fetch(`/api/user/${this.id}/orders/status`, { method: 'PUT',
            body: JSON.stringify(statusId),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include' })
                .then((res) => { if (res.status === 200) { alert('suc'); } else { alert('failed'); } })
                .catch((err) => { console.log(err, 'Failed to get image data'); });
    }

    render() {
        return (
            <button onClick={this.handleSubmit}>{this.buttonChange(this.role_id, this.state.status_id)}</button>
        );
    }
}

export default ButtonStatus;
