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


const recipeHelper = (dbResponse) => {
    const ingredients = [];

    dbResponse.forEach((field) => {
        ingredients.push(field.name);
    });

    const recipe = {
        id: dbResponse[0].id,
        title: dbResponse[0].title,
        description: dbResponse[0].description,
        rating: dbResponse[0].rating,
        photo: dbResponse[0].photo,
        ingredients,
    };

    return recipe;
};

recipeController.getRecipeById = (req, res) => {
    const id = req.params.id;

    const isPositiveIntegerNumeric = (arg) => {
        if (isNaN(+arg)) return false;
        const k = Math.floor(arg);
        return k === +arg && +arg > 0;
    };

    if (!isPositiveIntegerNumeric(id)) {
        res.json(new Error('Wrong id').message);
        return;
    }

    const recipeObject = new recipeModel()
    db.query(recipeObject.getRecipeById(id), (err, result) => {
        if (err) {
            res.json(err.name);
        } else if (result.rows.length === 0) {
            res.json(new Error('Wrong id').message);
        } else {
            const recipe = recipeHelper(result.rows);

            db.query(recipeObject.getTagsByRecipeId(id), (error, resultInner) => {
                recipe.tags = [];
                // we don't check for errors and return just blank array for tags
                if (resultInner.rows.length > 0) {
                    recipe.tags = resultInner.rows;
                }
                res.json(recipe);
            });
        }
    });
};

module.exports = recipeController;
