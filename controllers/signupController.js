import crypto from 'crypto';
import path from 'path';

import nodemailer from 'nodemailer';
import pg from 'pg';
import smtpTransport from 'nodemailer-smtp-transport';
import uuidv4 from 'uuid/v4';

import config from '../pg_config';
import signupModel from '../models/signupModel';

//db configuration
const conString   = config.str;

let signupController = {};

signupController.checkEmailExistence = (req, res) => {
    const emailForCheck = req.body.email;

    const client = new pg.Client(conString);
    client.connect();
    client.query(signupModel.findEmail(emailForCheck), (err, result) => {
        if (err) {
            console.log(err.stack);
            res.send(err.stack);
        } else {
            if (result.rows[0]) {
            res.send('emailExists');
            } else {
            res.send('emailDoesntExist');
            }
        }

        client.end((err) => {
            if (err) {
                console.log('error during disconnection', err.stack)
            }
        })

    });
};

signupController.register = (req, res) => {
    let credentials = req.body;
    credentials.password = crypto.createHash('sha256').update(credentials.password).digest('hex');
    //creating id for email password confirmation, save it to db with email;
    const confirmId = uuidv4();

    const client = new pg.Client(conString);
    client.connect();
    client.query(signupModel.insertIntoRegistration(confirmId, credentials.email, credentials.phone, credentials.password),
    (err,result) => {
        if(err) console.log(err);

        //setup nodemailer
        let mailOpts, smtpTrans;

        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}/${confirmId}`;

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

        client.end((e) => {
            if (e) {
                console.log('error during disconnection', e.stack)
             }
        })

    });
};

signupController.confirmId = (req,res) => {
    const confirmId = req.params.confirmId;

    const client = new pg.Client(conString);
    client.connect();
    client.query(signupModel.findEmailByConfirmId(confirmId), (err, result) => {
        if(err) console.log(err);

        if (result.rows[0]) {
            const email = result.rows[0].email;

            client.query(signupModel.moveFromRegistrationToUsers(confirmId, email),
            (e,res) => {
                if (e) console.log(e);

                client.end((err) => {
                    if (err) {
                        console.log('error during disconnection', err.stack)
                    }
                });

            });
            res.redirect('/signin')
        } else {
            res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
        }

    })
}

signupController.index = (req,res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
}

module.exports = signupController;
