import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';

import config from './config';

import recipeRoutes from './routes/recipe';
import signInRoutes from './routes/signin';
import signUpRoutes from './routes/signup';
import userRoutes from './routes/user';
import orderRoutes from './routes/order';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.use(userRoutes);
app.use(recipeRoutes);
app.use(signInRoutes);
app.use(signUpRoutes);
app.use(orderRoutes);


app.listen(config.port, config.host, () => {
    console.log("Server listening on port ", config.port);
  });
