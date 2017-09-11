import React, {Component} from 'react';
import SearchElement from './SearchElement';

const se = {
    position: 'absolute',
    widht: '400px'

}
class SearchElements extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div style={se} className="search-elements">
            <SearchElement/>
            <SearchElement/>
            <SearchElement/>
            <SearchElement/>
            <SearchElement/>
        </div>
        );
            
    }
}

export default SearchElements;
