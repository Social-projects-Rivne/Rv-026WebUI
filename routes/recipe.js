import express from 'express';

import recipeController from '../controllers/recipeController';

const router = express.Router();

router.get('/api/tags', recipeController.getAllTags);
router.post('/api/recipe', recipeController.createRecipe);

module.exports = router;