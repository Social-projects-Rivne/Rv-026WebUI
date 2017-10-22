import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'underscore';


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
class ItemsList extends Component {
    static defaultProps = {
        fieldName: '',
        status: '',
        onSave: null,
        items: [],
    }

    static propTypes = {
        fieldName: PropTypes.string,
        onSave: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            cancelItem: [],
            deletedItem: [],
            items: this.props.data,
            editing: false,
            saving: false,
            message: '',
        };
        this.edit = this.edit.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === 'success') {
            this.setState({
                message: 'Saved',
                saving: false,
                editing: false
            });
            wait(3000)
                .then(() => {
                    this.setState({ message: '' });
                });
        } else if (nextProps.status === 'error') {
            this.setState({
                message: "Couldn't save, try again later",
                saving: false,
                editing: false
            });
            wait(3000)
                .then(() => {
                    this.setState({ message: '' });
                });
        }
    }

    deleteItem(index) {
        const array = this.state.items;
        const delArr = this.state.deletedItem;
        const elem = array.splice(index, 1)[0];
        delArr.push({ 'id': elem.id, 'name': elem.name });
        this.setState({ deletedItem: delArr, items: array });
    }

    addItem(item) {
        const newArray = this.state.items.slice();
        newArray.push({ 'id': '', "name": item });
        this.setState({ items: newArray });
    }

    cancelEdit() {
        const arr = this.state.cancelItem;
        this.state.deletedItem.forEach((item) => {
            arr.push({ 'id': item.id, "name": item.name });
        });
        this.setState({ editing: !this.state.editing, items: arr, deletedItem: [], message: '' });
    }

    edit() {
        const arr = this.state.items;
        this.setState({ cancelItem: arr, editing: !this.state.editing });
    }

    saveEdit() {
        this.setState({
            deletedItem: [],
            editing: !this.state.editing,
            saving: true,
        });
        console.log(this.state.items);
        console.log(this.state.deletedItem);
        this.props.onSave(this.props.updateId, this.state.items, this.state.deletedItem, this.props.fieldName);

    }

    renderSavingAnimation() {
        if (this.state.saving) {
            return <ReactLoading style = { centerDiv }
            type = "bars"
            color = "#444"
            height = "70"
            width = "20" / > ;
        }
        return null;
    }


    render() {
        const items = this.state.items.map( (item, index) => {
                return <li key = { index } > { item.name } &nbsp; {
                    this.state.editing ? < button onClick = { this.deleteItem.bind(this, index) }
                    type = "button"
                    className = "btn btn-danger btn-sm" > Remove < /button> : null}</li >
                }, this);
        if (this.state.editing) {
            return ( 
                <div> { <AddItemForm addItem = { this.addItem.bind(this) }/>}
                    <div>
                        <ul className = "list-group" > 
                            { items } 
                        </ul> 
                    </div> 
                    <div> 
                        { this.state.message } 
                    </div> 
                    <div>
                        <button
                            style = { buttonCommon }
                            onClick = { this.saveEdit }
                            disabled = { this.state.saving } >
                        Save 
                        </button> 
                        <button
                            style = { buttonCommon }
                            onClick = { this.cancelEdit }
                            disabled = { this.state.saving } >
                        Cancel 
                        </button> 
                        { this.renderSavingAnimation() } 
                    </div>
                </div>
                );
            }
            return ( 
                <div>
                <div>
                <ul className = "list-group" > 
                { items } 
                </ul>
                </div>
                <div > { this.state.message } </div> 
                { this.renderSavingAnimation() }
                    { this.props.owner ? 
                    <button 
                        style = { buttonCommon }
                        onClick = { this.edit }>
                        Edit
                        </button>
                        : 
                        null
                    }         
                    </div>
                );
            }
        };


        class AddItemForm extends Component {
            createItem(e) {
                e.preventDefault();
                var item = this.refs.itemName.value;
                if (_.isString(item) && !_.isEmpty(item)) {
                    this.props.addItem(item);
                    this.refs.itemForm.reset();
                }
            }

            render() {
                return ( 
                    <form className = "form-inline" ref = "itemForm" onSubmit = { this.createItem.bind(this) } >
                    <div className = "form-group">
                    <label htmlFor = "itemItem" >
                    Item Name 
                    <input type = "text"
                        id = "itemItem"
                        ref = "itemName"
                        className = "form-control" / >
                    </label> 
                    </div> 
                    <button type = "submit"
                        className = "btn btn-primary"> 
                        Add item 
                        </button>
                    </form>
                )
            }
        };

        export default ItemsList;