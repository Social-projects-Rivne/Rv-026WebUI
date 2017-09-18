import path from 'path';

import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import uuidv4 from 'uuid/v4';

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
    const activationId = uuidv4();

    db.query(signupModel.upsertIntoUsers(credentials.email, credentials.phone, credentials.password, activationId),
    (err) => {
        if (err) {
            console.log(err);
        } else {
            const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}/${activationId}`;

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
    });
};

signupController.confirmEmail = (req, res) => {
    const confirmId = req.params.confirmEmail;

    db.query(signupModel.updateIsActivated(confirmId), (err) => {
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
