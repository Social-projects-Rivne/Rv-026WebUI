import React, {Component} from 'react';
import PropTypes from 'prop-types';

class InlineEditRadio extends Component {

  constructor (props) {
    super(props);
    this.dbName = this.props.dbName;
    this.name = this.props.name;
    this.id = this.props.userId,
    this.state = {
      value: '',
      role: this.props.role,
      role_id: this.props.role_id,
      editable: false,
      updateMessage: '',
      updateStatus: '',
      message: ''
    }

    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({value: event.target.value});
  }

  handleSwitch(event) {
    if( this.state.editable == false){
      this.setState({editable: true});
    }
    else {
      this.setState({editable: false});
    }
  }

  handleSubmit(event) {
    if(this.state.value !== 1) {
      this.setState({editable: false});
      event.preventDefault();
      let radioValue = {
        value: this.state.value
     }
     if(!radioValue.value){
       radioValue.value = "2";
     }
    fetch(`/api/user/${this.id}/updateRole`, {method: 'PUT',   body: JSON.stringify(radioValue), headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, credentials: 'include' })
      .then((res) => { if(res.status == 200) {this.setState({updateMessage: "Updated!", updateStatus: true})} else {this.setState({updateMessage: "Oooops! something wrong. Please try again later.", updateStatus: false})} })
      .then( setTimeout(() => this.setState({updateMessage: " ", updateStatus: false}), 2000))
        .then(() => {
          let val = '';
          switch (this.state.value) {
            case '1':
              val = 'admin';
              break;
            case '2':
              val = 'user';
              break;
            case '3':
              val = 'cook';
              break;
            default:
              val = 'user';
              break;
          }
          this.setState({role: val});
        })
       .catch(error => console.log(error) );
     } else {
       this.setState({editable: true, message: "Wrong user role!"});
     }
  }

  render() {
    if (this.state.editable) return (
            <div>{this.name}:
             <div className="formStyle">
              <span> user </span> <input type="radio" name="role" value="2" onChange={this.handleChange} />
              <span> cook </span> <input type="radio" name="role" value="3"  onChange={this.handleChange} />
              <input type="button" value="&#10004;" onClick={this.handleSubmit} className="updateButton" />
              <input type="button" value="&#10008;" onClick={this.handleSwitch} className="cancelButton" />
             </div>
             <span className="warningMessage">{this.state.message}</span>
            </div>
      );
    return (
          <div>
            <p  className="hoverInline" onClick={this.handleSwitch}>{this.name}: {this.state.role}</p>
            {this.state.updateStatus ? ( <span className="successMessage">{this.state.updateMessage}</span>) : ( <span  className="failedMessage">{this.state.updateMessage}</span> )}
          </div>
    )
  }
}

InlineEditRadio.propTypes = {
  role: PropTypes.string,
  role_id: PropTypes.number,
  userId: PropTypes.number
}

export default InlineEditRadio;
