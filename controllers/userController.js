import multiparty from 'multiparty';
import fs from 'fs';
import uuidv4 from 'uuid/v4';
import db from '../db';
import userModel from '../models/userModel';
import signinController from './signinController';

let userController = {};

userController.getUserInfo = (req, res, next) => {
    const userId = signinController.sessions[req.cookies.access];
    let userObject = new userModel();
    db.query(userObject.getUserInfo(userId), (err,result) => {
        if (err) {
           return next(err);
        } else{
           res.json(result);
        }
      });
};

userController.checkUserId = (req, res, next) => {
    let userId = signinController.sessions[req.cookies.access];
    let response = '';
    if (userId) {
        response = 'alreadyLoggedIn';
    }
    res.send(response);
}

userController.updateUserInfo = (req, res, next) => {
  const userId = signinController.sessions[req.cookies.access];
  const id = req.params.id;
  if(userId == id) {
  let editedField = req.body.dbName;
  let editedValue = req.body.value;
  let userObject = new userModel();
  db.query(userObject.updateUserInfo(editedField, editedValue, userId), (err,result) => {
    if (err) {
       return next(err);
    } else{
       return res.json("ok");
    }
    });
  } else {
      return next(err);
  }
}

userController.updateUserRole = (req, res, next) => {
  const userId = signinController.sessions[req.cookies.access];
  const id = req.params.id;
  if(userId == id) {
  let editedValue = req.body.value;
  var userObject = new userModel();
  db.query(userObject.updateUserRole(editedValue, userId), (err,result) => {
    if (err) {
        return next(err);

    } else{
        res.json("ok");
    }
    });
  } else {
      return next(err);
  }
}

userController.updateUserAvatar = (req, res, next) => {
  const userId = signinController.sessions[req.cookies.access];
  const id = req.params.id;
  if(userId == id) {
  let ImageSrc = req.body.value;
  var userObject = new userModel();
  db.query(userObject.updateUserAvatar(ImageSrc, userId), (err,result) => {
    if (err) {
       return next(err);
    } else{
       res.json("ok");
    }
    });
  } else {
      return next(err);
  }
}


module.exports=userController;
