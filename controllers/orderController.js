import db from '../db';
import orderModel from '../models/orderModel';

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
            db.query(orderModel.updateStatusId(statusId, orderId), (err, resultat) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
};

module.exports = orderController;
