
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import pg from 'pg';
import config from './pg_config.js'; //import pg_config

const app = express();
const port = process.env.port || 3090;

const conString = config.str;
const client = new pg.Client(conString);

client.connect(); //setting db connection

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

http.createServer(app).listen(port, () => {
    console.log("Server listening on port ", port);
});
                                                 

//Test db_config
//console.log(config);
//client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
