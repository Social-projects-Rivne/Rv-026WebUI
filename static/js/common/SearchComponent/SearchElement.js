import React, {Component} from 'react';

const searchel = {
    display: 'block',
    weight: '500px',
    height: '200px',
    background: '#ffff'
}

const image ={
    weight: '100px',
    height: '80px'
}

class SearchElement extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const element = this.props.element;
        return(
            <div key={element.id} className="search-element" style={searchel}>
                <img style={image} src={element.photo} />
                <p>{element.title}</p>
                <p>Рейтинг:{element.rating}</p>
            </div>
        );
    }
}

export default SearchElement;