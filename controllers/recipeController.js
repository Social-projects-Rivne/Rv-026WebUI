import path from 'path';
import pg from 'pg';

import config from '../pg_config';
import recipeModel from '../models/recipeModel.js';

const conString   = config.str;
const client      = new pg.Client(conString);
client.connect();

let recipeController = {};

recipeController.getAllRecepies = (req, res) => {	
    client.query(recipeModel.GetAllRecipes(), (err,result) => {
    	if(result.rows){
    		return res.json(result);
    	}
    	else{
    		console.log(err);
    	}
	  });
};

module.exports=recipeController;