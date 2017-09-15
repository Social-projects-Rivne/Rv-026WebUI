import React, {Component} from 'react';

const style = {
    display: 'inline-block',
    float: 'left',
    width: '20%'
}
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
            <div className="form-group" style={style}>
                <select className="form-control" onChange={this.onChange}>
                    <option value="select">Select</option>
                    <option value="searchByName">Search By Recipe Name</option>
                    <option value="searchByTagCategory">Search By Tag Category</option>
                    <option value="searchByTags">Search By Tags</option>
                    <option value="searchByIngredients">Search By Ingredients</option>
                </select>
            </div>
        );
    }
}
export default DropDown;