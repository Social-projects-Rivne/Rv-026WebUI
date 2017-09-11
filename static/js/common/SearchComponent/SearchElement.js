import React, {Component} from 'react';

const searchel = {
    marginTop: '5px',
    position: 'relative',
    display: 'block',
    width: '400px',
    backgroundColor: '#9d9d9d',
    zIndex:1
}

const image ={
    width: '100px',
    height: '80px', 
}
const text ={
    marginLeft: '105px',
    marginTop: '-50px',

}



class SearchElement extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className = "search-element" style={searchel}>
                    <img style={image} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXzJxdzEfyK3SqlD-eTWSGxQ1fUcEjypOHbRkq1SeDlQPgJZCy7A"/>
                    <div style={text}>
                    <p>Назва страви</p>
                    <p>Рейтинг:*****</p>
                    </div>

            </div>
        );
    }
}

export default SearchElement;