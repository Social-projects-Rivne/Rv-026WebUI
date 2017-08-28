import path from 'path';
import pg from 'pg';

import db from '../db';
import tagModel from '../models/tagModel.js';

let tagController = {};

tagController.getAllTags = (req, res) => {	
    db.query(tagModel.findAllTags(), (err,result) => {
    	if(result.rows){
    		return res.json(result);
    	}
    	else{
    		console.log(err);
    	}
	  });
};

module.exports=tagController;