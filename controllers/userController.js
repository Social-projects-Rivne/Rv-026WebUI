import db from '../db';
import UserModel from '../models/userModel';
import signinController from './signinController';

const userController = {};

userController.getUserInfo = (req, res, next) => {
    const userId = signinController.sessions[req.cookies.access];
    db.query(UserModel.getUserInfo(userId), (err, result) => {
        if (err) {
            res.status(500).sendStatus(500);
        } else {
            res.json(result);
        }
    });
};

userController.checkUserId = (req, res) => {
    const userId = signinController.sessions[req.cookies.access];
    let response = '';
    if (userId) {
        response = 'alreadyLoggedIn';
    }
    res.send(response);
};

userController.updateUserInfo = (req, res) => {
    const userId = signinController.sessions[req.cookies.access];
    const id = r;
    if (userId == id) {
        const editedField = req.body.dbName;
        const editedValue = req.body.temVal;
        console.log(editedValue);
        db.query(UserModel.updateUserInfo(editedField, editedValue, userId), (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(500);
    }
};

userController.updateUserRole = (req, res) => {
    const userId = signinController.sessions[req.cookies.access];
    const id = req.params.id;
    if (userId == id) {
        const editedValue = req.body.value;
        db.query(UserModel.updateUserRole(editedValue, userId), (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(500);
    }
};

userController.updateUserAvatar = (req, res) => {
    const userId = signinController.sessions[req.cookies.access];
    const id = req.params.id;
    if (userId == id) {
        const ImageSrc = req.body.value;
        db.query(UserModel.updateUserAvatar(ImageSrc, userId), (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(500);
    }
};


module.exports = userController;
