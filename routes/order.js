import express from 'express';

import orderController from '../controllers/orderController';

const router = express.Router();


router.post('/api/order', orderController.addOrder);
router.get('/api/orders', orderController.getAllOrders);
router.put('/api/order/status/:orderId/:statusName', orderController.updateStatus);

module.exports = router;
