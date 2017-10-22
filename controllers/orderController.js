
import multiparty from 'multiparty';

import db from '../db';

import signinController from '../controllers/signinController';

import orderModel from '../models/orderModel';
import { STATUS_NEW, STATUS_TAKEN, STATUS_CANCELED } from '../config';


const orderController = {};

const saveOrderContext = (idOrder, orderContext) => {
    for (let i = 0; i < orderContext.length; i += 1) {
        console.log(orderContext[i]);
        db.query(orderModel.saveOrderContext(idOrder, orderContext[i].id, orderContext[i].count), (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('All good!');
            }
        });
    }
};
orderController.addOrder = (req, res) => {
    const form = new multiparty.Form();
    let order = {
        userId: 1,
        comment: '',
        price: 0,
        status_id: null,
    };
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        } else {
            order.userId = signinController.sessions[req.cookies.access];
            order.comment = fields.comment[0];
            order.price = fields.price;
            const orderContext = JSON.parse(fields.orderContext);
            db.query(orderModel.findIdToStatusName(STATUS_NEW), (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    order.status_id = result.rows[0].id;
                    db.query(orderModel.saveOrder(order), (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            const idOrder = result.rows[0].id;
                            saveOrderContext(idOrder, orderContext);
                            res.send('Order created!');
                        }
                    });
                }
            });
        }
    });
};

orderController.getAllOrders = (req, res) => {
    db.query(orderModel.findAllOrders(), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const orders = result.rows;
            res.send(orders);
        }
    });
};

orderController.updateStatus = (req, res) => {
    const { orderId, statusName } = req.params;
    db.query(orderModel.findIdToStatusName(statusName), (error, result) => {
        if (error) {
            console.log(error);
        } else {
            const statusId = result.rows[0].id;
            if (statusName === STATUS_TAKEN) {
                const cookId = signinController.sessions[req.cookies.access];
                db.query(orderModel.updateStatusIdAndCookId(cookId, statusId, orderId), (err, resultat) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            } else if (statusName === STATUS_CANCELED) {
                db.query(orderModel.updateStatusIdAndCookId(null, statusId, orderId), (err, resultat) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            } else {
                db.query(orderModel.updateStatusId(statusId, orderId), (err, resultat) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        }
    });
};
module.exports = orderController;
