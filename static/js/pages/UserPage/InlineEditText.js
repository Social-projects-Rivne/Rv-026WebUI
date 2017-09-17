import React, {Component} from 'react';
import PropTypes from 'prop-types';

class InlineEditText extends Component {
  constructor (props) {
    super(props);
    this.dbName = this.props.dbName;
    this.name = this.props.name;
    this.id = this.props.userId,
    this.state = {
      value: this.props.value,
      temVal: this.props.value,
      editable: '',
      message: '',
      updateMessage: '',
      updateStatus: ''
    }

    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({temVal: event.target.value});
  }

  handleSwitch(event) {
    if( this.state.editable == false){
      this.setState({editable: true});
    }
    else {
      this.setState({editable: false, temVal: this.state.value, message: ' '});
    }
  }

  handleSubmit(event) {
    if((this.state.temVal.length == 0 && this.props.dbName == 'phone_number') || (this.state.temVal.length == 0 && this.props.dbName == 'email') ){
      this.setState({message: 'Please, enter something!'})
    } else {
      if(this.props.dbName == 'phone_number' && this.state.temVal.length > 24){
        this.setState({message: 'Please, enter less than 24 symbols!'})
      } else if (this.props.dbName == 'email' && this.state.temVal.length > 50) {
        this.setState({message: 'Please, enter less than 50 symbols!'})
      } else if (this.props.dbName == 'fullname' && this.state.temVal.length > 64) {
        this.setState({message: 'Please, enter less than 64 symbols!'})
      } else {
        this.setState({value: this.state.temVal, editable: false, message: ''})
        event.preventDefault();
        let textField = {
          value: this.state.temVal,
          dbName: this.props.dbName
        }
        fetch(`/api/user/${this.id}/updateProfile`, {method: 'PUT',   body: JSON.stringify(textField), headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, credentials: 'include' })
          .then(response => { response.json() })
          .then(this.setState({updateMessage: "Updated!", updateStatus: true}))
          .then( setTimeout(() => this.setState({updateMessage: " ", updateStatus: false}), 1000))
          .catch(error => console.log(error) );
        }
      }
  }

  render() {
    if (this.state.editable)
     return (
            <div>{this.dbName == "fullname" ? ( " " ) : (this.name +": ")}
             <div className="formStyle">
              {this.dbName == "about_me" ? ( <textarea value={this.state.temVal} onChange={this.handleChange} className="form-control" />  ) :
              ( <input type="text" value={this.state.temVal} onChange={this.handleChange} className="form-control" />)}
              <input type="button" value="&#10004;" onClick={this.handleSubmit} className="updateButton" />
              <input type="button" value="&#10008;" onClick={this.handleSwitch} className="cancelButton" />
             </div>
             <span className="warningMessage">{this.state.message}</span>
            </div>
      );
    return (
          <div>
            {this.dbName == "fullname" ? ( <h2 onClick={this.handleSwitch}>{this.state.value}</h2>  ) :
            ( <p onClick={this.handleSwitch}>{this.name}: {this.state.value}</p> )}
            {this.state.updateStatus ? ( <span className="successMessage">{this.state.updateMessage}</span>) : ( <span className="failedMessage">{this.state.updateMessage}</span> )}
          </div>
    )
  }
}

InlineEditText.propTypes = {
  value: PropTypes.string,
  userId: PropTypes.number
}

export default InlineEditText;
