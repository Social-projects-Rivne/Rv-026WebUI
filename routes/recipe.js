import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

router.get('/api/getallrecipes', recipeController.getAllRecepies);

module.exports = router;