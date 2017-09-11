import React, {Component} from 'react';
import SearchElement from './SearchElement';

class SearchElements extends Component{
    constructor(props){
        super(props);
    }

    renderListSearchElements(){
        return this.props.allElements.map(element => {
            return(
                <SearchElement 
                    key={element.id} 
                    element={element}
                />
            );
        });
    }

    render(){
        return(
            <div className="search-elements">
                {this.renderListSearchElements()}
            </div>
        );
    }
}

export default SearchElements;
