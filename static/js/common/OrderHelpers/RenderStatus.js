import React, { Component } from 'react';
import PropTypes from 'prop-types';

import switchColorToElement from './switchColorToElement';

class RenderStatus extends Component {
    render() {
        const { orderStatus } = this.props;
        const color = switchColorToElement(orderStatus);
    
        if (color) {
            return <span className="label label-status" style={{ backgroundColor: color }}>{orderStatus}</span>;
        }
        return (null);
    }
}

RenderStatus.PropTypes = {
    orderStatus: PropTypes.string,
};

export default RenderStatus;
