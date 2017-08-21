import React, { Component } from 'react';

class Result extends React.Component{
    render() {
        var result = this.props.result.map(function(result,index){
            return <ResultItem key={index} recipe={ result } />
            });
        return(
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class ResultItem extends React.Component{
    render(){
        var recipe = this.props.recipe;
        return(
            <tr >
                <td>{recipe.id}</td>
                <td>{recipe.title}</td>
                <td>{recipe.description}</td>
            </tr>
        );
    }
}

export default Result;