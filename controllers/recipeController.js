import multiparty from 'multiparty';
import fs from 'fs';
import uuidv4 from 'uuid/v4';

import db from '../db';
import recipeModel from '../models/recipeModel';
import tagModel from '../models/tagModel';

let recipeController = {};

recipeController.getAllRecepies = (req, res) => {
  var recipeObject = new recipeModel();
  db.query(recipeObject.getAllRecipes(), (err, result) => {
    if (result.rows) {
      return res.json(result);
    }
    else {
      console.log(err);
    }
  });
};

recipeController.getTagsRecipes = (req, res) => {
  var recipeObject = new recipeModel();
  db.query(recipeObject.getTagsRecipes(), (err, result) => {
    if (result.rows) {
      return res.json(result);
    }
    else {
      console.log(err);
    }
  });
};

var parseStringTags = (stringTags) => {
  var arrayTags = stringTags.split(',');
  for (var i = 0; i < arrayTags.length; i++) {
    arrayTags[i] = arrayTags[i].replace(/[-+().!@#$%^&' "*<>\s]/g, '');
  }
  return arrayTags;
}

recipeController.createRecipe = (req, res, next) => {
  let form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err);
    } else {
      let { path: tempPath, originalFilename, headers } = files.photo[0];
      var availableHeaderTypes = "image/jpeg|image/png|image/gif";
      var fileExtension = originalFilename.split('.').pop();
      if (availableHeaderTypes.includes(headers['content-type'])) {
        let copyToPath = "/public/images/recipes/" + originalFilename;
        let imageName = uuidv4();
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
                  var idReicpe = result.rows[0].id;
                  var recipeArrayTags = parseStringTags(fields.tags[0]);
                  db.query(tagModel.findAllTags(), (err, result) => {
                    if (err) {
                      return next(err);
                    } else {
                      var allTagsArray = result.rows;
                      var allTagsNameArray = allTagsArray.map(function (tag) {
                        return tag.name;
                      });
                      var uniqueTagsArray = recipeArrayTags.filter((o) => {
                        return allTagsNameArray.indexOf(o) == -1;
                      });

                      for (var i = 0; i < uniqueTagsArray.length; i++) {
                        db.query(tagModel.saveTags(uniqueTagsArray[i]), (err, resultat) => {
                          if (err) {
                            return next(err);
                          } else {
                            var idTag = resultat.rows[0].id;
                            db.query(recipeObject.saveRecipeTag(idReicpe, idTag), (err, result) => {
                              if (err) {
                                return next(err);
                              }
                            });
                          }
                        });
                      }
                      res.send("Recipe created!");
                    }
                  });
                }
              });
            });
          });
        });
      }
    }
  });
};

recipeController.checkTitleExistence = (req, res) => {
    const titleForCheck = req.body.title;
    
    var recipeObject = new recipeModel();
    db.query(recipeObject.findTitle(titleForCheck), (err, result) => {
        if (err) {
            console.log(err.stack);
            res.send(err.stack);
        } else {
            if (result.rows[0] && !result.rows[0].is_deleted) {
              res.send('titleExists');
            } else {
              res.send('titleDoesntExist');
            }
        }
    });
};

module.exports = recipeController;
