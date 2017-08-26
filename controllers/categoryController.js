import path from 'path';
import pg from 'pg';

import config from '../pg_config';
import categoryModel from '../models/categoryModel.js';

const conString   = config.str;
const client      = new pg.Client(conString);
client.connect();

let categoryController = {};

categoryController.getAllCategories = (req, res) => {	
    client.query(categoryModel.GetAllCategory(), (err,result) => {
    	if(result.rows){
    		console.log("OK");
    		return res.json(result);
    	}
    	else{
    		console.log("NE OK");
    		console.log(err);
    	}
	  });
};

module.exports=categoryController;