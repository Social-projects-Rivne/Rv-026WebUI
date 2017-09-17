import React, {Component} from 'react';

class DropDown extends Component {
    constructor(props){
        super(props);
        
        this.onChange = this.onChange.bind(this);
    };
    
    onChange(event){
        this.props.onSearchTypeChange(event.target.value);
    }

    render(){
        return(
            <select className="form-control select-search" onChange={this.onChange}>
                <option value="select">Select</option>
                <option value="searchByName">Name</option>
                <option value="searchByTagCategory">Tag Type</option>
            </select>
        );
    }
}

export default DropDown;