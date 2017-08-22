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
            if (result.rows[0] && !result.rows[0].is_deleted) {
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

    const client = new pg.Client(conString);
    client.connect();
    client.query(signupModel.upsertIntoUsers(credentials.email, credentials.phone, credentials.password),
    (err,result) => {
        if (err) {
            console.log(err);
        } else {
            client.query(signupModel.getId(credentials.email), (err,res) => {
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

                    client.end((e) => {
                        if (e) {
                            console.log('error during disconnection', e.stack)
                         }
                    })
                }
            }) // second query end
        }
    }); // first query end
};

signupController.confirmEmail = (req,res) => {
    const confirmId = req.params.confirmEmail.slice(40);

    const client = new pg.Client(conString);
    client.connect();
    client.query(signupModel.updateIsDeleted(confirmId), (err, result) => {
        if (err) {
            console.log(err);
            res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
        } else {
            res.redirect('/signin')
        }

        client.end((err) => {
            if (err) {
                console.log('error during disconnection', err.stack)
            }
        });
    })
}

signupController.index = (req,res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
}

module.exports = signupController;
