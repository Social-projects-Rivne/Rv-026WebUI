import React, { Component } from 'react';

const style = {
    display: 'inline-block',
    float: 'left',
    width: '70%'
  
}
const style1 = {
    
    backgroundImage: 'url(./public/images/icons/searchIcon.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '5px',
    paddingLeft: '40px'
}

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { item: '' };
    }

    onInputChange(item) {
        this.setState({ item });
        this.props.onSearchItemChange(item);
    }

    render() {
        return (
            <div className="search-bar" style={style}>
                <input 
                    className="form-control"
                    style = {style1}
                    type="text"
                    value={this.state.item}
                    onChange={event => this.onInputChange(event.target.value)}
                />
            </div>
        );
    }
}

export default SearchBar;