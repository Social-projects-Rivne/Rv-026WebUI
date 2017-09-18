import express from 'express';

import userController from '../controllers/userController';

const router = express.Router();

router.get('/api/profile', userController.getUserInfo);

module.exports = router;
