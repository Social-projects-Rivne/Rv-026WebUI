import express from 'express';

import categoryController from '../controllers/categoryController';

const router = express.Router();

router.get('/api/category/all', categoryController.getAllCategories);

module.exports = router;