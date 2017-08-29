import crypto from 'crypto';
import path from 'path';

import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import uuidv4 from 'uuid/v4';

import db from '../db';
import signupModel from '../models/signupModel';

let signupController = {};

signupController.checkEmailExistence = (req, res) => {
    const emailForCheck = req.body.email;

    db.query(signupModel.findEmail(emailForCheck), (err, result) => {
        if (err) {
            console.log(err.stack);
            res.send(err.stack);
        } else {
            if (result.rows[0] && !result.rows[0].is_deleted) {
            res.send('emailExists');
            } else {
            res.send('emailDoesntExist');
            }
        }
    });
};

signupController.register = (req, res) => {
    let credentials = req.body;
    credentials.password = crypto.createHash('sha256').update(credentials.password).digest('hex');

    // const client = new pg.Client(conString);
    // client.connect();
    db.query(signupModel.upsertIntoUsers(credentials.email, credentials.phone, credentials.password),
    (err,result) => {
        if (err) {
            console.log(err);
        } else {
            db.query(signupModel.getId(credentials.email), (err,res) => {
                if (err) {
                    console.log(err);
                } else {
                    const confirmStr = crypto.createHash('sha1').update(''+res.rows[0].id).digest('hex')+res.rows[0].id;
                    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}/${confirmStr}`;
                    //setup nodemailer
                    let smtpTrans, mailOpts;
                    smtpTrans = nodemailer.createTransport(smtpTransport({
                        service:'Gmail',
                        auth:{
                            user:"noreplyfmd@gmail.com",
                            pass:"happysmile1"
                        }
                    }));

                    mailOpts = {
                        from:req.body.email,
                        to:credentials.email,
                        subject:"Confirm registration",
                        text:fullUrl
                    };

                    smtpTrans.sendMail(mailOpts, (e, response) => {
                        if(e) console.log(e);
                    })
                }
            }) // second query end
        }
    }); // first query end
};

signupController.confirmEmail = (req,res) => {
    const confirmId = req.params.confirmEmail.slice(40);

    db.query(signupModel.updateIsDeleted(confirmId), (err, result) => {
        if (err) {
            console.log(err);
            res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
        } else {
            res.redirect('/signin')
        }
    })
}

signupController.index = (req,res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
}

module.exports = signupController;
