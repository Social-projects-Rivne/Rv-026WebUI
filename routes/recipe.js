import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

<<<<<<< HEAD
router.post('/api/recipe', recipeController.createRecipe);
router.post('/api/checkTitleExistence', recipeController.checkTitleExistence);
router.get('/api/:tag_id/recipes', recipeController.getRecipesByTagId);
+router.get('/api/recipes', recipeController.getAllRecepies);
=======
router.get('/api/recipes/', recipeController.getAllRecepies);
router.get('/api/recipes/tags', recipeController.getTagsRecipes);
router.get('/api/tags', recipeController.getAllTags);
router.post('/api/recipe', recipeController.createRecipe);
router.get('/api/recipes/:id', recipeController.getRecipeById);
>>>>>>> feature/showRecipe

module.exports = router;