import express from 'express';

import signinController from '../controllers/signinController';

const router = express.Router();

router.post('/api/login', signinController.login);
router.get('/api/logout', signinController.logout);
router.get('/api/checkLogin', signinController.checkLogin);
router.get('/api/checkLoginCook', signinController.checkLoginCook);

module.exports = router;
