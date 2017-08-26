import db from '../db';
import recipeModel from '../models/recipeModel';

let recipeController = {};

recipeController.getAllTags = (req, res) => {
    db.query(recipeModel.findAllTags(), (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Find All Tags!');
        res.send(result.rows);
      }
    });
};

module.exports = recipeController;