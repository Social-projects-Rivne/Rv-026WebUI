import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ChangeStatus from '../../../common/ListOrders/ChangeStatus';

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

    getAllTitles(recipes_id, recipes_title, count) {
        const objects = [];
        for (let i = 0; i < recipes_id.length; i++) {
            objects.push(_.zipObject(
                ['recipes_id', 'recipes_title', 'count'],
                [recipes_id[i], recipes_title[i], count[i]],
            ));
        }
        const allRecipec = objects.map((item) => {
            return (
                <div key={item.recipes_id} >
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
        const ordersList =  this.props.result.map((item) => {
            return (
                <div key={item.id} className="flexbox-table">
                    <div className="cell">{item.id}</div>
                    {this.role_name === 'user' ?
                        <div className="cell">
                            <Link to={`/user/${item.cooker_id}`}>{!item.fullname ? (item.email.split('@')[0]) : item.fullname }</Link>
                        </div>
                      :  this.role_name === 'cook' ?
                          <div className="cell">
                              <Link to={`/user/${item.user_id}`}>{!item.fullname ? (item.email.split('@')[0]) : item.fullname }</Link>
                          </div>
                    : <div className="cell">{item.cooker_id} / {item.fullname}</div> }
                    <div className="cell">{item.status}</div>
                    <div className="cell">{this.getAllTitles(item.recipes_id, item.recipes_title, item.count)}</div>
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
                    {this.role_name === 'user' ? <div className="cell">Cooker</div> :  this.role_name === 'cook' ? <div className="cell">Client</div> : <div className="cell">Cooker / Owner</div> }
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
