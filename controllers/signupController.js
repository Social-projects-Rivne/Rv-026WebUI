import crypto from 'crypto';
import path from 'path';

import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

import db from '../db';
import signupModel from '../models/signupModel';

const signupController = {};

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
    const credentials = req.body;
    db.query(signupModel.upsertIntoUsers(credentials.email, credentials.phone, credentials.password),
    (err) => {
        if (err) {
            console.log(err);
        } else {
            db.query(signupModel.getId(credentials.email), (error, resInner) => {
                if (error) {
                    console.log(error);
                } else {
                    const confirmStr = crypto.createHash('sha1').update('' + resInner.rows[0].id).digest('hex') + resInner.rows[0].id;
                    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}/${confirmStr}`;

                    // setup nodemailer
                    const smtpTrans = nodemailer.createTransport(smtpTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'noreplyfmd@gmail.com',
                            pass: 'happysmile1',
                        },
                    }));


                    const mailOpts = {
                        from: req.body.email,
                        to: credentials.email,
                        subject: 'Confirm registration',
                        text: fullUrl,
                    };

                    smtpTrans.sendMail(mailOpts, (e) => {
                        if (e) console.log(e);

                    });
                    res.json('registrationSuccessful');
                }
            }); // second query end
        }
    }); // first query end
};

signupController.confirmEmail = (req, res) => {
    const confirmId = req.params.confirmEmail.slice(40);

    db.query(signupModel.updateIsDeleted(confirmId), (err, result) => {
        if (err) {
            console.log(err);
            res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
        } else {
            res.redirect('/signin');
        }
    });
};

signupController.index = (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
};

module.exports = signupController;
