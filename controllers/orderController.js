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
/*
    test update
*/
orderController.updateOrderTest = (req, res) => {
    db.query(`UPDATE orders SET status_id = 4 WHERE id = 1`, (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};

module.exports = orderController;
