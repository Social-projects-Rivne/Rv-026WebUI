import React, { Component } from 'react';
import _ from 'underscore';
import Result from './Result';


class ListComponent extends Component {
    constructor() {
        super();
        this.state = { orders: [] };
    }

    componentDidMount() {
        fetch('/api/user/orders', { method: 'GET', credentials: 'include' })
            .then(response => response.json())
            .then(({ rows: orders }) => this.setState({ orders }));
    }

    render() {
        const orders = this.state.orders;
        return (
            <div>
                { _.isEmpty(orders) ? <p>Sorry, there are no orders yet :(</p> : <Result result={orders} /> }
            </div>
        );
    }
}

export default ListComponent;
