import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

router.get('/api/recipes/all', recipeController.getAllRecepies);
router.get('/api/recipes/tags', recipeController.getTagsRecipes);

module.exports = router;