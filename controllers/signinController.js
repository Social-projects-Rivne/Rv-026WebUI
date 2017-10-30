import uuidv4 from 'uuid/v4';

import db from '../db';
import signinModel from '../models/signinModel';

const signinController = {};
signinController.sessions = {};

signinController.login = (req, res) => {
    const credentials = req.body;
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
        } else if (!queryResult.is_activated) {
            response = 'Email is not activated';
        } else {
            response = 'ok';
            // adding cookie session to the response
            const cookie = uuidv4();
            const roleCookie = queryResult.user_role;
            signinController.sessions[cookie] = queryResult.id;
            res.cookie('access', cookie);
            res.cookie('role', roleCookie);
        }
        res.send(response);
    });
};

signinController.logout = (req, res) => {
    delete signinController.sessions[req.cookies.access];
    res.clearCookie('access');
    res.clearCookie('role');
    res.redirect('/');
};

signinController.checkLogin = (req, res) => {
    let response = 'ok';
    if (req.cookies.access in signinController.sessions) {
        response = 'alreadyLoggedIn';
    }
    res.send(response);
};

signinController.checkLoginCook = (req, res) => {
    let response = 'ok';
    const cookId = signinController.sessions[req.cookies.access];
    if (cookId) {
        db.query(signinModel.findRoleById(cookId), (err, result) => {
            if (err) {
                console.log(err);
                res.send(response);
            } else {
                const roleName = result.rows[0].user_role;
                if (roleName === 'cook' && req.cookies.access in signinController.sessions) {
                    response = 'alreadyLoggedInCook';
                    res.send(response);
                } else {
                    res.send(response);
                }
            }
        });
    } else {
        res.send(response);
    }
};

module.exports = signinController;
