import db from '../db';
import orderModel from '../models/orderModel';
import signinController from './signinController';
import { STATUS_TAKEN } from '../config';

const orderController = {};

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
