import React, {Component} from 'react';

class DropDown extends Component {
    constructor(props){
        super(props);

    };
    
    render(){
        return(
            <div className="form-group">
                <select className="form-control" id="sel1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </div>
        );
    }
}
export default DropDown;