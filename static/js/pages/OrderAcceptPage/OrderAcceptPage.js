import React, { Component } from 'react';
import {
    Button,
    FormControl,
    FormGroup,
} from 'react-bootstrap';

import Header from '../../common/Header';


class OrderAcceptPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <p>My order</p>
                <div>Order Form</div>

            </div>

        );
    }
}

export default OrderAcceptPage;
