import uuidv4 from 'uuid/v4';

import db from '../db';
import signinModel from '../models/signinModel';

const signinController = {};
signinController.sessions = {};

signinController.login = (req, res) => {
    const credentials = req.body;
    console.log('credentials:', credentials);
    let response = '';

    db.query(signinModel.findUserByEmail(credentials.email),
    (err, result) => {
        const queryResult = result.rows[0];
        if (err) {
            response = "Can't fetch data from db";
            console.log(err);
        } else if (!queryResult) {
            response = 'No such email';
        } else if (queryResult.password !== credentials.password) {
            response = 'Email and password do not match';
        } else {
            response = 'ok';
            // adding cookie session to the response
            const cookie = uuidv4();
            signinController.sessions[cookie] = queryResult.id;
            res.cookie('access', cookie);
        }
        res.send(response);
    });
};

signinController.logout = (req, res) => {
    delete signinController.sessions[req.cookies.access];
    res.clearCookie('access');
    res.send('cookie access cleared');
};

signinController.checkLogin = (req, res) => {
    let response = 'ok';
    if (req.cookies.access in signinController.sessions) {
        response = 'alreadyLoggedIn';
    }
    res.send(response);
};

module.exports = signinController;
