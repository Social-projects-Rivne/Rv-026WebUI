import path from 'path';
import pg from 'pg';

import config from '../pg_config';
import userModel from '../models/userModel';
import roleModel from '../models/roleModel';

const conString   = config.str;
const client      = new pg.Client(conString);
client.connect();

let userController = {};

userController.getUserInfo = (req, res) => {
    //let userId = req.params.id; // need a method for the current user ID
    let userId = 3;
    client.query(userModel.getUserInfo(userId), (err,result) => {
    	if (result.rows) {
        let queries = [];

        // user role section

        let roleId = result.rows[0].role_id;
        queries.push(client.query(roleModel.getRoleName(roleId)));

        Promise.all(queries).then(values => {
          result.rows[0].user_role = values[0].rows[0].user_role; // user role name
          return res.json(result);
        });

        // end user role section

    	}
    	else{
    		console.log(err);
    	}
	  });
};

module.exports=userController;
