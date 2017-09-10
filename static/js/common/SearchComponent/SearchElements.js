import React, {Component} from 'react';
import SearchElement from './SearchElement';


class SearchElements extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div className="search-elements">
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
