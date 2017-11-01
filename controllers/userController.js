import { ROLE_USER, ROLE_COOK } from '../config';
import db from '../db';
import UserModel from '../models/userModel';
import signinController from './signinController';


const userController = {};

userController.getUserInfo = (req, res) => {
    const userId = signinController.sessions[req.cookies.access];
    db.query(UserModel.getUserInfo(userId), (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(result);
        }
    });
};

userController.getUserOrders = (req, res) => {
    const userId = signinController.sessions[req.cookies.access];
    const id = req.params.id;
    const roleName = req.params.role_name;
    if (userId == id) {
        if (roleName === ROLE_USER) {
            db.query(UserModel.getUserOrders(userId), (err, result) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json(result);
                }
            });
        } else if (roleName === ROLE_COOK) {
            db.query(UserModel.getCookOrders(userId), (err, result) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json(result);
                }
            });
        } else {
            db.query(UserModel.getCookOrders(userId), (err, result) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json(result);
                }
            });
        }
    } else {
        res.sendStatus(500);
    }
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
    const id = req.params.id;
    if (userId == id) {
        const editedField = req.body.dbName;
        const editedValue = req.body.temVal;
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

userController.getUser = (req, res) => {
    const userId = req.params.id;
    db.query(UserModel.getUser(userId), (err, result) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(result);
        }
    });
};

module.exports = userController;
