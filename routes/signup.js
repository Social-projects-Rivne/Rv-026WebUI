import express from 'express';

import signupController from '../controllers/signupController';

const router = express.Router();

router.post('/api/checkEmailExistence', signupController.checkEmailExistence);
router.post('/api/register', signupController.register);
router.get('/api/register/:confirmEmail', signupController.confirmEmail);
router.get('*', signupController.index);

module.exports = router;
