import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

router.post('/api/recipe', recipeController.createRecipe);
router.get('/api/checkTitleExistence', recipeController.checkTitleExistence);
router.get('/api/recipes/tag/search', recipeController.getRecipesByTagId);
router.get('/api/recipes/search', recipeController.getAllRecepies);
router.get('/api/recipes/getAllIngredients', recipeController.getAllIngredients);
router.get('/api/recipes/name/search', recipeController.getRecepiesByName);
router.get('/api/recipes/tagtype/search', recipeController.getRecepiesByTagType);
router.get('/api/recipes/ingredients/search', recipeController.getRecepiesByIngredients);
router.get('/api/recipes/autocomplete', recipeController.autocompleteRecepies);
router.get('/api/recipes/:id', recipeController.getRecipeById);
router.put('/api/recipe/edit/:id', recipeController.updateRecipe);

module.exports = router;
