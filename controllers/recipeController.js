import db from '../db';
import recipeModel from '../models/recipeModel';
import tagModel from '../models/tagModel';

let recipeController = {};

recipeController.getAllTags = (req, res, next) => {
  db.query(tagModel.findAllTags(), (err, result) => {
    if (err) {
      return next(err); 
    } else {
      res.send(result.rows);
    }
  });
};

recipeController.createRecipe = (req, res, next) => {
  db.query(recipeModel.saveRecipe(req.body), (err, result) => {
    if (err) {
      return next(err); 
    } else {
      res.send({"message": "Recipe created!"});
    }
  });
};

module.exports = recipeController;