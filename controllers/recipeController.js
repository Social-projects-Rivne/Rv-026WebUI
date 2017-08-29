import multiparty from 'multiparty';
import fs from 'fs';
import uuid from 'node-uuid';

import db from '../db';
import recipeModel from '../models/recipeModel';
import tagModel from '../models/tagModel';

let recipeController = {};

recipeController.getAllRecepies = (req, res) => {
    var recipeObject = new recipeModel();
    db.query(recipeObject.getAllRecipes(), (err,result) => {
    	if(result.rows){
    		return res.json(result);
    	}
    	else{
    		console.log(err);
    	}
	  });
};

recipeController.getTagsRecipes = (req, res) => {
  var recipeObject = new recipeModel();
	db.query(recipeObject.getTagsRecipes(), (err, result)=>{
		if(result.rows){
			return res.json(result);
		}
		else{
			console.log(err);
		}
	});
};

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
    if (err) {
      return next(err); 
    } else {
      let { path: tempPath, originalFilename, headers} = files.photo[0];
      var availableHeaderTypes = "image/jpeg|image/png|image/gif";
      var fileExtension = originalFilename.split('.').pop();
      if(availableHeaderTypes.includes(headers['content-type']))
      {
        let copyToPath = "/public/images/recipes/" + originalFilename;
        let imageName = uuid.v4();
        let fullPath = `public/images/recipes/${imageName}.${fileExtension}`;
        fs.readFile(tempPath, (err, data) => {
          fs.writeFile(fullPath, data, (err) => {
            fs.unlink(tempPath, () => {

              var recipeObject = new recipeModel(
                fields.title[0], 
                fields.description[0], 
                false, 
                Number(fields.owner_id[0]),
                fullPath,
                Number(fields.rating[0])
              );

              db.query(recipeObject.saveRecipe(recipeObject), (err, result) => {
                if (err) {
                  return next(err); 
                } else {
                  res.send("Recipe created!");
                }
              });
            });
          }); 
        }); 
      } 
    }
  });
};

module.exports = recipeController;
