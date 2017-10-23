import React, { Component } from 'react';
import { connect } from 'react-redux';

class TestComponentOnMainPage extends Component {
    renderTestList() {
        return this.props.testItems.map((testItem) => {
            return (
                <li key={testItem.id}>
                    {testItem.title} {testItem.description}
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <h5>Test Component On Main Page</h5>
                {this.renderTestList()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        testItems: state.testData,
    };
}

export default connect(mapStateToProps)(TestComponentOnMainPage);
