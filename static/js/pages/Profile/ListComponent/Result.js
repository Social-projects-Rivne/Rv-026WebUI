import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ChangeStatus from '../../../common/ChangeStatus';
import RenderStatus from '../../../common/OrderHelpers/RenderStatus';
import createArrayObjectsFromArrays from '../../../common/OrderHelpers/createArrayObjectsFromArrays';
import { ROLE_USER, ROLE_COOK } from '../../../../../config';

class Result extends Component {
    constructor(props) {
        super(props);
        this.role_name = this.props.role_name;
        this.userId = this.props.id;
        this.ChangeStatus = this.props.onStatusSubmit;
        this.state = {
            process: 'fetching',
        };
    }

    getAllTitles(order_contex_id, recipes_id, recipes_title, count) {
        const objects = createArrayObjectsFromArrays(order_contex_id, recipes_id, recipes_title, count);
        const allRecipec = objects.map((item) => {
            return (
                <div key={item.order_contex_id} >
                    <Link to={`/recipes/${item.recipes_id}`}>{item.recipes_title}</Link> <span>Х {item.count}</span>
                </div>
            );
        });
        return (
            <div>
                {allRecipec}
            </div>
        );
    }

    render() {
        const ordersList = this.props.result.map((item) => {
            return (
                <div key={item.id} className="flexbox-table">
                    <div className="cell">{item.id}</div>
                    {this.role_name === ROLE_USER ?
                        <div className="cell">
                            <Link to={`/user/${item.cooker_id}`}>{!item.fullname ? _.split(item.email, '@', 1)[0] : item.fullname }</Link>
                        </div>
                      :  this.role_name === ROLE_COOK ?
                          <div className="cell">
                              <Link to={`/user/${item.user_id}`}>{!item.fullname ? _.split(item.email, '@', 1)[0] : item.fullname }</Link>
                          </div>
                    : <div className="cell">{item.cooker_id} / {item.fullname}</div> }
                    <div className="cell">
                        <RenderStatus orderStatus={item.status} />
                    </div>
                    <div className="cell">{this.getAllTitles(item.order_contex_id, item.recipes_id, item.recipes_title, item.count)}</div>
                    <div className="cell">{item.price} ₴</div>
                    <div className="cell"><ChangeStatus orderId={item.order_id[0]} status={item.status} role={this.role_name} onStatusSubmit={this.ChangeStatus} /></div>
                    {!_.isEmpty(item.comment) ? <div className="cell">Comment: {item.comment}</div> : ''}
                </div>
            );
        });

        return (
            <div>
                <div className="flexbox-table">
                    <div className="cell">#</div>
                    {this.role_name === ROLE_USER ? <div className="cell">Cooker</div> :  this.role_name === ROLE_COOK ? <div className="cell">Client</div> : <div className="cell">Cooker / Owner</div> }
                    <div className="cell"> Status</div>
                    <div className="cell">Dishes</div>
                    <div className="cell">Price</div>
                    <div className="cell">Change status</div>
                </div>
                {ordersList}
            </div>
        );
    }
}

Result.propTypes = {
    id: PropTypes.number,
    role_name: PropTypes.string,
    onStatusSubmit:  PropTypes.func,
};

export default Result;
