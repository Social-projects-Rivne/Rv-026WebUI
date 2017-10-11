import multiparty from 'multiparty';

import db from '../db';

import signinController from '../controllers/signinController';

import orderModel from '../models/orderModel';

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
        },
        );
    }
};
orderController.addOrder = (req, res) => {
    const form = new multiparty.Form();
    let order = {
        userId: 1,
        comment: '',
        price: 0,
        status: 1,
    };
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        } else {
            order.userId = signinController.sessions[req.cookies.access];
            order.comment = fields.comment[0];
            order.price = fields.price;
            console.log(order);
            const orderContext = JSON.parse(fields.orderContext);
            console.log(orderContext);
            db.query(orderModel.saveOrder(order), (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    const idOrder = result.rows[0].id;
                    saveOrderContext(idOrder, orderContext);
                    res.send('Order creat ed!');
                }
            });
        }
    },
);
};

module.exports = orderController;
