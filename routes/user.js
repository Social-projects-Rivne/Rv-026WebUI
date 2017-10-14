import express from 'express';

import userController from '../controllers/userController';

const router = express.Router();

router.get('/api/user', userController.getUserInfo);
router.get('/api/user/:id', userController.getUser);
router.get('/api/user/:id/orders/role=:role_name', userController.getUserOrders);
router.put('/api/user/:id/update/profile', userController.updateUserInfo);
router.put('/api/user/:id/update/role', userController.updateUserRole);
router.put('/api/user/:id/update/gravatar', userController.updateUserAvatar);


module.exports = router;
