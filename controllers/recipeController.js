import multiparty from 'multiparty';
import fs from 'fs';
import uuidv4 from 'uuid/v4';

import db from '../db';
import recipeModel from '../models/recipeModel';
import tagModel from '../models/tagModel';

import signinController from '../controllers/signinController';

const recipeController = {};

const parseStringElements = (stringElements) => {
    const arrayElements = stringElements.split(',');
    for (let i = 0; i < arrayElements.length; i++) {
        arrayElements[i] = arrayElements[i].replace(/[-+().!@#$%^&' "*<>\s]/g, '');
    }
    return arrayElements;
};

const saveTagsInRecipeTag = (idReicpe, idTag) => {
    const recipeObject = new recipeModel();
    db.query(recipeObject.saveRecipeTag(idReicpe, idTag), (err, result) => {
        if (err) {
            console.log(err);
        }
    });
};

const saveUniqueTags = (idReicpe, uniqueTagsArray) => {
    if (uniqueTagsArray.length > 0) {
        for (let i = 0; i < uniqueTagsArray.length; i++) {
            db.query(tagModel.saveTags(uniqueTagsArray[i]), (err, resultat) => {
                if (err) {
                    console.log(err);
                } else {
                    const idTag = resultat.rows[0].id;
                    saveTagsInRecipeTag(idReicpe, idTag);
                }
            });
        }
    }
};

const saveRepetitiveTags = (idReicpe, repetitiveTagsArray) => {
    if (repetitiveTagsArray.length > 0) {
        for (let i = 0; i < repetitiveTagsArray.length; i++) {
            db.query(tagModel.findTagByName(repetitiveTagsArray[i]), (err, resultat) => {
                if (err) {
                    console.log(err);
                } else {
                    const idTag = resultat.rows[0].id;
                    saveTagsInRecipeTag(idReicpe, idTag);
                }
            });
        }
    }
};

const saveRecipeTags = (idReicpe, recipeArrayTags) => {
    db.query(tagModel.findAllTags(), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const allTagsArray = result.rows;
            const allTagsNameArray = allTagsArray.map(tag => tag.name);
            const uniqueTagsArray = recipeArrayTags.filter(o => allTagsNameArray.indexOf(o) === -1);
            const repetitiveTagsArray = recipeArrayTags.filter(o => allTagsNameArray.indexOf(o) !== -1);
            saveRepetitiveTags(idReicpe, repetitiveTagsArray);
            saveUniqueTags(idReicpe, uniqueTagsArray);
        }
    });
};

const uploadImageToServer = (tempPath, fullPath) => {
    fs.readFile(tempPath, (errorData, data) => {
        if (errorData) {
            console.log(errorData);
        } else {
            fs.writeFile(fullPath, data, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    fs.unlink(tempPath, (err) => {
                        console.log(err);
                    });
                }
            });
        }
    });
};

recipeController.createRecipe = (req, res) => {
    const ownerId = signinController.sessions[req.cookies.access];
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        } else {
            const { path: tempPath, originalFilename, headers } = files.photo[0];
            const availableHeaderTypes = 'image/jpeg|image/png|image/gif';
            const fileExtension = originalFilename.split('.').pop();
            const imageName = uuidv4();
            const fullPath = `public/images/recipes/${imageName}.${fileExtension}`;
            const fullPathForSave = `/../${fullPath}`;
            if (availableHeaderTypes.includes(headers['content-type'])) {
                uploadImageToServer(tempPath, fullPath);
            }
            console.log(fields);
            const recipeObject = new recipeModel(
                fields.title[0],
                fields.description[0],
                null,
                ownerId,
                fullPathForSave,
                fields.rating[0],
            );
            db.query(recipeObject.saveRecipe(recipeObject), (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    const idReicpe = result.rows[0].id;
                    const recipeArrayTags = parseStringElements(fields.tags[0]);
                    saveRecipeTags(idReicpe, recipeArrayTags);
                    res.send('Recipe created!');
                }
            });
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

const recipeHelper = (dbResponse, cookie_id) => {
    const ingredients = [];
    var is_ok = false;
    if (parseInt(dbResponse[0].owner_id) === parseInt(cookie_id)) {
        is_ok = true;
    }

    dbResponse.forEach((field) => {
        ingredients.push({ "id": field.ingredientid, "name": field.name });
    });

    const recipe = {
        id: dbResponse[0].id,
        title: dbResponse[0].title,
        description: dbResponse[0].description,
        rating: dbResponse[0].rating,
        photo: dbResponse[0].photo,
        is_owner: is_ok,
        ingredients,
    };

    return recipe;
};

recipeController.getRecipeById = (req, res) => {
    const id = req.params.id;
    let ownerId = signinController.sessions[req.cookies.access];

    if (!id.match(/^[0-9]+$/)) {
        res.json(new Error('Wrong id').message);
        return;
    }

    const recipeObject = new recipeModel()
    db.query(recipeObject.getRecipeById(id), (err, result) => {
        if (err) {
            res.json(err.name);
        } else if (result.rows.length === 0) {
            res.json(new Error('No such id in db').message);
        } else {
            const recipe = recipeHelper(result.rows, ownerId);

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

recipeController.updateRecipe = (req, res) => {
    const recipeData = req.body;
    const recipeObject = new recipeModel();

    if (recipeData.fieldName == "ingredients" || recipeData.fieldName == "tags") {
        let status = true;
        let fieldConnect = null;
        let table = null;
        if (recipeData.fieldName == "ingredients") {
            fieldConnect = "ingredient";
            table = "calc_card";
        }
        if (recipeData.fieldName == "tags") {
            fieldConnect = "tag";
            table = "recipe_tag";
        }
        recipeData.deleteValue.forEach((value) => {
            db.query(recipeObject.removeDbLink(table, fieldConnect, recipeData.id, value.id), (error) => {
                if (error) {
                    status = false;
                }
            });
        });
        if (!status) {
            res.sendStatus(500)
        }
        recipeData.addValue.forEach((value) => {
            db.query(recipeObject.updateRecipe(recipeData, value.name), (error, result) => {
                if (result.rows) {
                    const insertId = result.rows[0].id;
                    db.query(recipeObject.addDbLink(table, fieldConnect, recipeData.id, insertId), (error) => {
                        if (error) {
                            status = false;
                        } else {
                            status = true;
                        }
                    });
                } else {
                    console.log(error);
                }
            });
        });
        if (status) {
            res.sendStatus(200)
        } else {
            res.sendStatus(500);
        }
    } else {
        db.query(recipeObject.upsertData(recipeData), (err) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    }
};

module.exports = recipeController;