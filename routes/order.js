import express from 'express';

import orderController from '../controllers/orderController';

const router = express.Router();

router.post('/api/addOrder', orderController.addOrder);


module.exports = router;
