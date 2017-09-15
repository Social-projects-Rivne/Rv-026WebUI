import  React, {Component} from 'react';

const style = {
    display: 'inline-block',
    float: 'left',
    width: '10%'
}

class SearchButton extends Component {
    constructor (props){
    super(props)
    }

    render(){
        return(
            
            <button type="button" className="btn btn-success" style ={style}>Find</button>
            
        );
    }
}

export default SearchButton;