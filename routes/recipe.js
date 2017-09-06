import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

router.get('/api/recipes/', recipeController.getAllRecepies);
router.get('/api/recipes/tags', recipeController.getTagsRecipes);
router.get('/api/tags', recipeController.getAllTags);
router.post('/api/recipe', recipeController.createRecipe);
router.get('/api/recipes/:id', recipeController.getRecipeById);

module.exports = router;