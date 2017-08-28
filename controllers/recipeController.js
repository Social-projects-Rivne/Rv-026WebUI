import path from 'path';
import pg from 'pg';

import db from '../db';
import recipeModel from '../models/recipeModel.js';

let recipeController = {};

recipeController.getAllRecepies = (req, res) => {	
    db.query(recipeModel.GetAllRecipes(), (err,result) => {
    	if(result.rows){
    		return res.json(result);
    	}
    	else{
    		console.log(err);
    	}
	  });
};

recipeController.getTagsRecipes = (req, res) => {
	db.query(recipeModel.getTagsRecipes(), (err, result)=>{
		if(result.rows){
			return res.json(result);
		}
		else{
			console.log(err);
		}
	});
};

module.exports=recipeController;