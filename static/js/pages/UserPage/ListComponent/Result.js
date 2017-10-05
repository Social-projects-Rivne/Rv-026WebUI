import React, { Component } from 'react';

class Result extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.role_id;
    }

    render() {
        const ordersList =  this.props.result.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    {this.id === 2 ? <td>{item.cooker_id}</td> :  this.id === 3 ? <td>{item.fullname}</td> : <span><td>{item.cooker_id}</td><td>{item.fullname}</td></span> }
                    <td>{item.status}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                </tr>
            );
        });

        return (
            <div className="table-responsive">
                <table className="table orders-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            {this.id === 2 ? <th>Cooker</th> :  this.id === 3 ? <th>Owner</th> : <span><th>Cooker</th><th>Owner</th></span> }
                            <th>Status</th>
                            <th>Dishes</th>
                            <th>Price</th>
                            <th>Change status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Result;
