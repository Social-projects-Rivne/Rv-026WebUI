import path from 'path';
import db from '../db';

import userModel from '../models/userModel';

let userController = {};

userController.getUserInfo = (req, res) => {
    //let userId = req.params.id; // need a method for the current user ID
    let userId = 1;
    db.query(userModel.getUserInfo(userId), (err,result) => {
    	if (result.rows) {
          return res.json(result);
    	}
    	else{
    		console.log(err);
    	}
	  });
};

module.exports=userController;
