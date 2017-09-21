import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

router.post('/api/recipe', recipeController.createRecipe);
router.post('/api/checkTitleExistence', recipeController.checkTitleExistence);
router.get('/api/:tag_id/recipes', recipeController.getRecipesByTagId);
router.get('/api/recipes', recipeController.getAllRecepies);
router.get('/api/recipes/search/name=:name', recipeController.getRecepiesByName);
router.get('/api/recipes/search/tagtype=:tagtype', recipeController.getRecepiesByTagType);
router.post('/api/recipes/search/name', recipeController.autocompleteRecepiesByName);
router.post('/api/recipes/search/tagtype', recipeController.autocompleteRecepiesByTagType);
router.get('/api/recipes/:id', recipeController.getRecipeById);
router.put('/api/recipe/edit/:id', recipeController.updateRecipe);

module.exports = router;