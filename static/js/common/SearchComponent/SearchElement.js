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
        return(
            <div className = "search-element" style={searchel}>
                    <img style={image} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXzJxdzEfyK3SqlD-eTWSGxQ1fUcEjypOHbRkq1SeDlQPgJZCy7A"/>
                    <p>Назва страви</p>
                    <p>Рейтинг:*****</p>
            </div>
        );
    }
}

export default SearchElement;