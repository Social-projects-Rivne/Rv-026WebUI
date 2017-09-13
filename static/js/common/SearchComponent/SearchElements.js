import React, {Component} from 'react';
import SearchElement from './SearchElement';


const se = {
    position: 'absolute',
    widht: '100%'
}

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


            <div style={se} className="search-elements">
                {this.renderListSearchElements()}
            </div>
        );
    }
}

export default SearchElements;
