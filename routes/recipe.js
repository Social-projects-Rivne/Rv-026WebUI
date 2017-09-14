import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

router.post('/api/recipe', recipeController.createRecipe);
router.post('/api/checkTitleExistence', recipeController.checkTitleExistence);
router.get('/api/:tag_id/recipes', recipeController.getRecipesByTagId);
router.get('/api/recipes', recipeController.getAllRecepies);

router.post('/api/recipes/search', recipeController.getRecepiesByName);

module.exports = router;