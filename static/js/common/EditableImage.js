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

class EditableImage extends Component {

    static defaultProps = {
        fieldName: '',
        status: '',
        onSave: null,
        style: {},
        link: '',
    }
    static propTypes = {
        status: PropTypes.string,
        fieldName: PropTypes.string,
        onSave: PropTypes.func,
        style: PropTypes.object,
        link: PropTypes.string,
    }

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            saving: false,
            link: this.props.link,
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
        if (this.input.value.length > 120) {
            this.setState({
                message: 'Field cannot be longer than 60 symbols',
                saving: false,
                editing: false });
            wait(3000)
            .then(() => {
                this.setState({ message: '' });
            });
        } else {
            this.props.onSave(this.props.updateId, this.props.fieldName, this.input.value);
            this.setState({link: this.input.value});
        }
    }

    renderSavingAnimation() {
        if (this.state.saving) {
            return <ReactLoading style={centerDiv} type="bars" color="#444" height="70" width="20" />;
        }
        return null;
    }

    render() {
        if (this.state.editing) {
            return (
                <div>
                    <div>
                        <img src={this.props.link} alt="" width="250" />
                    </div>
                    <input
                        type="text"
                        defaultValue={this.props.link}
                        ref={(input) => { this.input = input; }}/>
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
                <div>
                    <img src={this.state.link} alt="" width="250" />
                </div>

                <button style={buttonCommon} onClick={this.edit}>Edit</button>
                <div>{this.state.message}</div>
            </div>
        );
    }
}

export default EditableImage;