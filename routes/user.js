import express from 'express';

import userController from '../controllers/userController';

const router = express.Router();

router.get('/api/user', userController.getUserInfo);
router.get('/api/user/:id/orders', userController.getUserOrders);
router.put('/api/user/:id/updateProfile', userController.updateUserInfo);
router.put('/api/user/:id/updateRole', userController.updateUserRole);
router.put('/api/user/:id/updateGravatar', userController.updateUserAvatar);

module.exports = router;
