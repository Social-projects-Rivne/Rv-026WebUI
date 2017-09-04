import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

router.get('/api/recipes/all', recipeController.getAllRecepies);
router.get('/api/recipes/tags', recipeController.getTagsRecipes);
router.post('/api/recipe', recipeController.createRecipe);
router.post('/api/checkTitleExistence', recipeController.checkTitleExistence);

module.exports = router;