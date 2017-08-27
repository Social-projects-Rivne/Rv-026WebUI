import fs from 'fs';
import multiparty from 'multiparty';
import uuid from 'node-uuid';

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
  let form = new multiparty.Form();
  
  form.parse(req, (err, fields, files) => {
    let { path: tempPath, originalFilename } = files.photo[0];
    let copyToPath = "../public/images/" + originalFilename;
    let imageName = uuid.v4();
    let fullPath = `public/images/${imageName}.jpg`;
    fs.readFile(tempPath, (err, data) => {
      fs.writeFile(fullPath, data, (err) => {
        fs.unlink(tempPath, () => {
          res.send("File uploaded");
        });
      }); 
    }); 
  });

};

module.exports = recipeController;