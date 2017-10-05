import React, { Component } from 'react';
import _ from 'underscore';
import ReactLoading from 'react-loading';
import Result from './Result';
import wait from '../../../common/wait';

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.userId;
        this.role_id = this.props.role_id;
        this.state = { orders: [], process: 'fetching' };
    }

    componentDidMount() {
        wait(2000)
        .then(() => {
            fetch(`/api/user/${this.id}/orders`, { method: 'GET', credentials: 'include' })
            .then(response => response.json(), this.setState({ process: 'fetched' }))
            .then(({ rows: orders }) => this.setState({ orders }));
        })
          .catch((err) => {
              this.setState({ process: 'failedToFetch' });
              console.log(err, 'Failed to get profile data');
          });
    }

    render() {
        const orders = this.state.orders;
        const phase = this.state.process;
        if (phase === 'fetching') {
            return (
                <div>
                    <ReactLoading style={centerDiv} type="bars" color="#444" height="70" width="20" />
                </div>
            );
        } else if (phase === 'fetched') {
            return (
                <div>
                    { _.isEmpty(orders) ? <p>Sorry, there are no orders yet :(</p> : <Result result={orders} role_id={this.role_id} /> }
                </div>
            );
        } else if (phase === 'failedToFetch') {
            return (
                <div>
                    <h6>Failed to fetch your data :( </h6>
                </div>
            );
        }
    }
}

export default ListComponent;
