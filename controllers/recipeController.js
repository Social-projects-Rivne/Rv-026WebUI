import multiparty from 'multiparty';
import fs from 'fs';
import uuidv4 from 'uuid/v4';

import db from '../db';
import recipeModel from '../models/recipeModel';
import tagModel from '../models/tagModel';

import signinController from '../controllers/signinController';

let recipeController = {};

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
                let fullPathForSave = `../${fullPath}`;
                let ownerId = signinController.sessions[req.cookies.access];
                fs.readFile(tempPath, (err, data) => {
                    fs.writeFile(fullPath, data, (err) => {
                        fs.unlink(tempPath, () => {
                            var recipeObject = new recipeModel(
                                fields.title[0],
                                fields.description[0],
                                false,
                                ownerId,
                                fullPathForSave,
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
                                            var repetitiveTagsArray = recipeArrayTags.filter((o) => {
                                                return allTagsNameArray.indexOf(o) !== -1;
                                            });
                                            if (repetitiveTagsArray.length > 0) {
                                                for (var i = 0; i < repetitiveTagsArray.length; i++) {
                                                    db.query(tagModel.findTagByName(repetitiveTagsArray[i]), (err, resultat) => {
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
                                            }
                                            if (uniqueTagsArray.length > 0) {
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

recipeController.getRecipesByTagId = (req, res, next) => {
    var tagId = req.params.tag_id;
    var recipeObject = new recipeModel();

    db.query(recipeObject.findRecipesByTagId(tagId), (err, result) => {
        if (err) {
            return next(err);
        } else {
            var recipes = result.rows;
            var recipesNotDeleted = recipes.filter((o) => {
                if (!o.is_deleted) {
                    o.description = o.description.substring(0, 80);
                    return recipes.indexOf(o) !== -1;
                }
            });
            res.send(recipesNotDeleted);
        }
    });
};

recipeController.getAllRecepies = (req, res, next) => {
    var recipeObject = new recipeModel();
    db.query(recipeObject.getAllRecipes(), (err, result) => {
        if (err) {
            return next(err);
        } else {
            var recipes = result.rows;
            var recipesNotDeleted = recipes.filter((o) => {
                if (!o.is_deleted) {
                    o.description = o.description.substring(0, 80);
                    return recipes.indexOf(o) !== -1;
                }
            });
            res.send(recipesNotDeleted);
        }
    });
};

recipeController.getRecepiesByName = (req, res, next) => {
    var recipeObject = new recipeModel();
    var recipeName = req.params.name;
    db.query(recipeObject.findRicipesByName(recipeName), (err, result) => {
        if (err) {
            console.log('error!');
            return next(err);
        } else {
            var recipes = result.rows;
            var recipesNotDeleted = recipes.filter((o) => {
                if (!o.is_deleted) {
                    return recipes.indexOf(o) !== -1;
                }
            });
            res.send(recipesNotDeleted);
        }
    });

}

recipeController.getRecepiesByTagType = (req, res, next) => {
    var recipeObject = new recipeModel();
    var tagType = req.params.tagtype;
    db.query(recipeObject.findRicipesByTagType(tagType), (err, result) => {
        if (err) {
            console.log('error!');
            return next(err);
        } else {
            var recipes = result.rows;
            var recipesNotDeleted = recipes.filter((o) => {
                if (!o.is_deleted) {
                    return recipes.indexOf(o) !== -1;
                }
            });
            res.send(recipesNotDeleted);
        }
    });
}

recipeController.autocompleteRecepiesByTagType = (req, res, next) => {
    var recipeObject = new recipeModel();
    var tagType = req.body.item;
    db.query(recipeObject.findTop5RicipesByTagType(tagType), (err, result) => {
        if (err) {
            console.log('error!');
            return next(err);
        } else {
            var recipes = result.rows;
            var recipesNotDeleted = recipes.filter((o) => {
                if (!o.is_deleted) {
                    return recipes.indexOf(o) !== -1;
                }
            });
            res.send(recipesNotDeleted);
        }
    });
}

recipeController.autocompleteRecepiesByName = (req, res, next) => {
    var recipeObject = new recipeModel();
    var recipeName = req.body.item;
    db.query(recipeObject.findTop5RicipesByName(recipeName), (err, result) => {
        if (err) {
            console.log('error!');
            return next(err);
        } else {
            var recipes = result.rows;
            var recipesNotDeleted = recipes.filter((o) => {
                if (!o.is_deleted) {
                    return recipes.indexOf(o) !== -1;
                }
            });
            res.send(recipesNotDeleted);
        }
    });

}

module.exports = recipeController;
