import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchElementRating extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        var stars = [];
        var inputStars = this.props.stars
        for (var i = 0; i < 5; i++) {
            if (inputStars <= i) {
                stars.push(
                    <span key={i}>{'\u2606'}</span>
                );
            }
            else {
                stars.push(
                    <span key={i}>{'\u2605'}</span>
                );
            }

        }
        return (

            <div className='element-rating'>
                {stars.length > 0 ? <span>{stars}</span> : null}
            </div>
        );
    }
}

SearchElementRating.PropTypes = {
    stars: PropTypes.object
};

export default SearchElementRating;