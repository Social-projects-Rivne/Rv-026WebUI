import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

router.get('/api/recipes/all', recipeController.getAllRecepies);
router.get('/api/recipes/category/:id', recipeController.getAllRecepiesByCategory);

module.exports = router;