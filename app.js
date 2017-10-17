import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';

import recipeRoutes from './routes/recipe';
import orderRoutes from './routes/order';
import signInRoutes from './routes/signin';
import signUpRoutes from './routes/signup';
import userRoutes from './routes/user';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.use(userRoutes);
app.use(recipeRoutes);
app.use(orderRoutes);
app.use(signInRoutes);
app.use(signUpRoutes);
app.listen(3090, 'localhost', () => {
    console.log('Server listening on port ', 3090);
});
