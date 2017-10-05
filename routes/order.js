import express from 'express';

import orderController from '../controllers/orderController';

const router = express.Router();

router.get('/api/orders', orderController.getAllOrders);

/*
    test update
*/
router.put('/api/orderTestUpdate', orderController.updateOrderTest);

module.exports = router;
