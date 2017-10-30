import multiparty from 'multiparty';
import fs from 'fs';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';

import db from '../db';
import recipeModel from '../models/recipeModel';
import tagModel from '../models/tagModel';
import ingredientModel from '../models/ingredientModel';
import {
    SEARCH_BY_NAME,
    SEARCH_BY_TAG_CATEGORY,
    SEARCH_BY_INGREDIENTS,
} from '../config';

import signinController from '../controllers/signinController';

const recipeController = {};

const parseStringElements = (stringElements) => {
    let arrayElements = stringElements.split(',');
    for (let i = 0; i < arrayElements.length; i++) {
        arrayElements[i] = arrayElements[i].replace(/[^a-zA-Z0-9а-яА-Я]/g, '');
    }
    arrayElements = _.uniqBy(arrayElements, e => e);
    return arrayElements;
};

const saveTagsInRecipeTag = (idReicpe, idTag) => {
    db.query(recipeModel.saveRecipeTag(idReicpe, idTag), (err, result) => {
        if (err) {
            console.log(err);
        }
    });
};

const saveUniqueTags = (idReicpe, uniqueTagsArray) => {
    if (!_.isEmpty(uniqueTagsArray)) {
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
    if (!_.isEmpty(repetitiveTagsArray)) {
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

const saveIngredientsInCalcCard = (idReicpe, idIngredient) => {
    db.query(recipeModel.saveRecipeIngredient(idReicpe, idIngredient), (err, result) => {
        if (err) {
            console.log(err);
        }
    });
};

const saveUniqueIngredients = (idReicpe, uniqueIngredientsArray) => {
    if (!_.isEmpty(uniqueIngredientsArray)) {
        for (let i = 0; i < uniqueIngredientsArray.length; i++) {
            db.query(ingredientModel.saveIngredients(uniqueIngredientsArray[i]), (err, resultat) => {
                if (err) {
                    console.log(err);
                } else {
                    const idIngredient = resultat.rows[0].id;
                    saveIngredientsInCalcCard(idReicpe, idIngredient);
                }
            });
        }
    }
};

const saveRepetitiveIngredients = (idReicpe, repetitiveIngredientsArray) => {
    if (!_.isEmpty(repetitiveIngredientsArray)) {
        for (let i = 0; i < repetitiveIngredientsArray.length; i++) {
            db.query(ingredientModel.findIngredientByName(repetitiveIngredientsArray[i]), (err, resultat) => {
                if (err) {
                    console.log(err);
                } else {
                    const idIngredient = resultat.rows[0].id;
                    saveIngredientsInCalcCard(idReicpe, idIngredient);
                }
            });
        }
    }
};

const saveRecipeIngredients = (idReicpe, recipeArrayIngredients) => {
    db.query(ingredientModel.findAllIngredients(), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const allIngredientsArray = result.rows;
            const allIngredientsNameArray = allIngredientsArray.map(i => i.name);
            const uniqueIngredientsArray = recipeArrayIngredients.filter(o => allIngredientsNameArray.indexOf(o) === -1);
            const repetitiveIngredientsArray = recipeArrayIngredients.filter(o => allIngredientsNameArray.indexOf(o) !== -1);
            saveRepetitiveIngredients(idReicpe, repetitiveIngredientsArray);
            saveUniqueIngredients(idReicpe, uniqueIngredientsArray);
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
            const recipe = {
                title: fields.title[0],
                description: fields.description[0],
                is_deleted: null,
                owner_id: ownerId,
                photo: fullPathForSave,
                rating: fields.rating[0],
            };
            db.query(recipeModel.saveRecipe(recipe), (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    const idReicpe = result.rows[0].id;
                    const recipeArrayTags = parseStringElements(fields.tags[0]);
                    const recipeArrayIngredients = parseStringElements(fields.ingredients[0]);
                    saveRecipeTags(idReicpe, recipeArrayTags);
                    saveRecipeIngredients(idReicpe, recipeArrayIngredients);
                    res.send('Recipe created!');
                }
            });
        }
    });
};

recipeController.checkTitleExistence = (req, res) => {
    const titleForCheck = req.query.title;

    db.query(recipeModel.findTitle(titleForCheck), (err, result) => {
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

recipeController.getRecipesByTagId = (req, res) => {
    const tagId = req.query.tag;
    if (!tagId) {
        res.sendStatus(404);
    }
    db.query(recipeModel.findRecipesByTagId(tagId, req.query.maxId), (err, result) => {
        if (err) {
            res.sendStatus(500);
            console.log(err);
        } else {
            const recipes = result.rows;
            const recipesNotDeleted = recipes.filter((o) => {
                if (!o.is_deleted) {
                    o.description = o.description.substring(0, 80);
                    return recipes.indexOf(o) !== -1;
                }
            });
            res.send(recipesNotDeleted);
        }
    });
};

recipeController.getAllRecepies = (req, res) => {
    db.query(recipeModel.getAllRecipes(req.query.maxId), (err, result) => {
        if (err) {
            res.sendStatus(500);
            console.log(err);
        } else {
            const recipes = result.rows;
            const recipesNotDeleted = recipes.filter((o) => {
                if (!o.is_deleted) {
                    o.description = o.description.substring(0, 80);
                    return recipes.indexOf(o) !== -1;
                }
            });
            res.send(recipesNotDeleted);
        }
    });
};

recipeController.getRecepiesByName = (req, res) => {
    const recipeName = req.query.name;
    if (!recipeName) {
        res.sendStatus(404);
    }
    db.query(recipeModel.findRicipesByName(recipeName, req.query.maxId), (err, result) => {
        if (err) {
            res.sendStatus(500);
            console.log(err);
        } else {
            const recipes = result.rows;
            const recipesNotDeleted = recipes.filter((o) => {
                if (!o.is_deleted) {
                    return recipes.indexOf(o) !== -1;
                }
            });
            res.send(recipesNotDeleted);
        }
    });
};

recipeController.getRecepiesByTagType = (req, res) => {
    const tagType = req.query.tagtype;
    if (!tagType) {
        res.sendStatus(404);
    }
    db.query(recipeModel.findRicipesByTagType(tagType, req.query.maxId), (err, result) => {
        if (err) {
            res.sendStatus(500);
            console.log(err);
        } else {
            const recipes = result.rows;
            const recipesNotDeleted = recipes.filter((o) => {
                if (!o.is_deleted) {
                    return recipes.indexOf(o) !== -1;
                }
            });
            res.send(recipesNotDeleted);
        }
    });
};

recipeController.autocompleteRecepies = (req, res, next) => {
    const recipeItem = req.query.item;
    const searchparam = req.query.searchparam;
    if (searchparam === SEARCH_BY_NAME) {
        db.query(recipeModel.findTop5RicipesByName(recipeItem), (err, result) => {
            if (err) {
                console.log('error!');
                return next(err);
            } else {
                const recipes = result.rows;
                const recipesNotDeleted = recipes.filter((o) => {
                    if (!o.is_deleted) {
                        return recipes.indexOf(o) !== -1;
                    }
                });
                res.send(recipesNotDeleted);
            }
        });
    } else if (searchparam === SEARCH_BY_TAG_CATEGORY) {
        db.query(recipeModel.findTop5RicipesByTagType(recipeItem), (err, result) => {
            if (err) {
                console.log('error!');
                return next(err);
            } else {
                const recipes = result.rows;
                const recipesNotDeleted = recipes.filter((o) => {
                    if (!o.is_deleted) {
                        return recipes.indexOf(o) !== -1;
                    }
                });
                res.send(recipesNotDeleted);
            }
        });
    }
};

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

    db.query(recipeModel.getRecipeById(id), (err, result) => {
        if (err) {
            res.json(err.name);
        } else if (result.rows.length === 0) {
            res.json(new Error('No such id in db').message);
        } else {
            const recipe = recipeHelper(result.rows, ownerId);

            db.query(recipeModel.getTagsByRecipeId(id), (error, resultInner) => {
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
            db.query(recipeModel.removeDbLink(table, fieldConnect, recipeData.id, value.id), (error) => {
                if (error) {
                    status = false;
                }
            });
        });
        if (!status) {
            res.sendStatus(500)
        }
        recipeData.addValue.forEach((value) => {
            db.query(recipeModel.updateRecipe(recipeData, value.name), (error, result) => {
                if (result.rows) {
                    const insertId = result.rows[0].id;
                    db.query(recipeModel.addDbLink(table, fieldConnect, recipeData.id, insertId), (error) => {
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
        if(!recipeData.fieldName || !recipeData.value){
            res.sendStatus(404);
        }
        else{
            db.query(recipeModel.upsertData(recipeData), (err) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
        
    }
};

recipeController.getAllIngredients = (req, res) => {
    db.query(ingredientModel.getAllIngredients(), (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json(result.rows);
        }
    });
};

recipeController.getRecepiesByIngredients = (req, res) => {
    const ingredients = req.query.ingredients;
    if (!ingredients) {
        res.sendStatus(404);
    }
    db.query(recipeModel.findRecipesByIngredients(ingredients, req.query.maxId), (err, result) => {
        if (err) {
            res.sendStatus(500);
            console.log(err);
        } else {
            const recipesNotDeleted = result.rows.filter((o) => {
                if (!o.is_deleted) {
                    return result.rows.indexOf(o) !== -1;
                }
            });
            res.json(recipesNotDeleted);
        }
    });
};

module.exports = recipeController;
