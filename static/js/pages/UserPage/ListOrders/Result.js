import React, { Component } from 'react';

class Result extends Component {
    render() {
        const ordersList = this.props.result.map(function (result, index) {
            return <ResultItem key={index} orders={result} />
        });
        return (
            <div className="table-responsive">
                <table className="table orders-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Owner</th>
                            <th>Cooker</th>
                            <th>Status</th>
                            <th>Dishes</th>
                            <th>Price</th>
                            <th>Change status</th>
                        </tr>
                    </thead>
                    {ordersList}
                </table>
            </div>

        );
    }
}

class ResultItem extends Component {
    render() {
        const orders = this.props.orders;
        return (
            <tbody>
                <tr>
                    <td>{orders.id}</td>
                    <td>{orders.fullname}</td>
                    <td>{orders.cooker_id}</td>
                    <td>{orders.status}</td>
                    <td>{orders.title}</td>
                    <td>{orders.price}</td>
                </tr>
            </tbody>
        );
    }
}

export default Result;
