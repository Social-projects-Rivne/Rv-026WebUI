import React, { Component } from 'react';
import ResultItem from './ResultItem';

class Result extends Component{
    render() {
        let profile = this.props.result.map(function(result,index){

            return <ResultItem key={index} user={result} />
        });
        return(
            <div className="container">
              {profile}
            </div>
        );
    }
}


export default Result;
