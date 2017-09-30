import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

import wait from './wait';

const buttonCommon = {
    backgroundColor: 'white',
    border: 'none',
    textDecoration: 'underline',
    display: 'inline-block',
    color: 'blue',
    outline: 'none',
};

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

class EditableText extends Component {

    static defaultProps = {
        fieldName: '',
        status: '',
        onSave: null,
        style: {},
        text: '',
        type: 'input',
    }
    static propTypes = {
        status: PropTypes.string,
        fieldName: PropTypes.string,
        onSave: PropTypes.func,
        style: PropTypes.object,
        text: PropTypes.string,
        type: PropTypes.oneOf(['textarea', 'input']),
    }

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            saving: false,
            text: this.props.text,
            message: '',
        };

        this.edit = this.edit.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.renderSavingAnimation = this.renderSavingAnimation.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === 'success') {
            this.setState({
                message: 'Saved',
                saving: false,
                editing: false });
            wait(3000)
            .then(() => {
                this.setState({ message: '' });
            });
        } else if (nextProps.status === 'error') {
            this.setState({
                message: "Couldn't save, try again later",
                saving: false,
                editing: false });
            wait(3000)
            .then(() => {
                this.setState({ message: '' });
            });
        }
    }

    cancelEdit() {
        this.setState({ editing: false, message: '' });
    }

    edit() {
        this.setState({ editing: true });
    }

    saveEdit() {
        this.setState({
            saving: true,
        });
        if (this.props.type === 'input' && this.input.value.length > 20) {
            this.setState({
                message: 'Field cannot be longer than 20 symbols',
                saving: false,
                editing: false });
            wait(3000)
            .then(() => {
                this.setState({ message: '' });
            });
        } else if (this.props.type === 'textarea' && this.input.value.length > 200) {
            this.setState({
                message: 'Field cannot be longer than 200 symbols',
                saving: false,
                editing: false });
            wait(3000)
            .then(() => {
                this.setState({ message: '' });
            });
        } else {
            this.props.onSave(this.props.updateId, this.props.fieldName, this.input.value);
            this.setState({text: this.input.value});
        }
    }

    renderSavingAnimation() {
        if (this.state.saving) {
            return <ReactLoading style={centerDiv} type="bars" color="#444" height="70" width="20" />;
        }
        return null;
    }

    renderInput() {
        return (<input
            type="text"
            defaultValue={this.props.text}
            disabled={this.state.saving}
            ref={(input) => { this.input = input; }}/>);
    }

    renderTextarea() {
        return (<textarea
            defaultValue={this.props.text}
            disabled={this.state.saving}
            ref={(input) => { this.input = input; }}/>);
    }

    renderEditableElement() {
        switch (this.props.type) {
        case 'input':
            return this.renderInput();
        case 'textarea':
        default:
            return this.renderTextarea();
        }
    }

    render() {
        if (this.state.editing) {
            return (
                <div>
                    {this.renderEditableElement()}
                    <div>
                        <button
                            style={buttonCommon}
                            onClick={this.saveEdit}
                            disabled={this.state.saving}
                        >
                            Save
                        </button>
                        <button
                            style={buttonCommon}
                            onClick={this.cancelEdit}
                            disabled={this.state.saving}
                        >
                            Cancel
                        </button>
                        {this.renderSavingAnimation()}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div style={this.props.style}>{this.state.text}</div>
                <button style={buttonCommon} onClick={this.edit}>Edit</button>
                <div>{this.state.message}</div>
            </div>
        );
    }
}

export default EditableText;