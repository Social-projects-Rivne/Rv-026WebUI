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

class ItemsList extends Component{
  static defaultProps = {
    fieldName: '',
    status: '',
    onSave: null,
    items: [],
  }

  static propTypes = {
    status: PropTypes.string,
    fieldName: PropTypes.string,
    onSave: PropTypes.func,
    items: PropTypes.array,
  }

  constructor(props){
    super(props);
    this.state = { 
      cancelItem: [],
      deletedItem: [], 
      items: this.props.data, 
      editing: false, 
      saving: false, 
      message: '' 
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

  deleteItem(index){
    var array = this.state.items;
    var delArr = this.state.deletedItem;
    var elem = array.splice(index, 1);
    elem.forEach((item) => {
        delArr.push({"id":item.id,"name":item.name});
    });
    this.setState({deletedItem: delArr,items: array });
  }

  addItem(item) {
    var newArray = this.state.items.slice();
    newArray.push({"id":'',"name":item});
    this.setState({items:newArray})
  }

  cancelEdit() {
    var arr = this.state.items;
    this.state.deletedItem.forEach((item) => {
        arr.push({"id":item.id,"name":item.name});
    });
    this.setState({ editing: !this.state.editing, items: arr, deletedItem: [], message: ''});
  }

  edit(){
    this.setState({ editing: !this.state.editing});
  }

  saveEdit() {
    this.setState({
        deletedItem: [],
        editing: !this.state.editing,
        saving: true,
    });

    this.props.onSave(this.props.updateId, this.state.items, this.state.deletedItem, this.props.fieldName);
    
  } 

  renderSavingAnimation() {
    if (this.state.saving) {
        return <ReactLoading style={centerDiv} type="bars" color="#444" height="70" width="20" />;
    }
     return null;
  }


  render() {
      var items = this.state.items.map(function(item,index){
        return <li key={index}> { item.name } &nbsp; { this.state.editing ? <button onClick={this.deleteItem.bind(this,index)} type="button" className="btn btn-danger btn-sm">Remove</button> : null}</li>
    }, this);
    if(this.state.editing){
      return(
      <div>
          {<AddItemForm addItem={this.addItem.bind(this)} />}
          <div>
            <ul className="list-group">
              {    items     }
            </ul>
          </div>
          <div>{this.state.message}</div>
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
            <ul className="list-group">
              {    items     }
            </ul>
          </div>
        <div>{this.state.message}</div>
        {this.renderSavingAnimation()}
        <button style={buttonCommon} onClick={this.edit}>Edit</button>
      </div>
    );
  }
};


class AddItemForm extends Component{
  createItem(e) {
    e.preventDefault();
    var item = this.refs.itemName.value;
    if(typeof item === 'string' && item.length > 0) {
      this.props.addItem(item);
      this.refs.itemForm.reset();
    }
  }

  render() {
    return(
    <form className="form-inline" ref="itemForm" onSubmit={this.createItem.bind(this)}>
      <div className="form-group">
        <label htmlFor="itemItem">
          Item Name
          <input type="text" id="itemItem" placeholder="e.x.lemmon" ref="itemName" className="form-control" />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Add item</button>
    </form>
    )
    }
};

export default ItemsList;