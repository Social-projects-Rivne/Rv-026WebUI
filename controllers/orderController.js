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

module.exports = orderController;
