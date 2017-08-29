import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import express from 'express';

import recipeRoutes from './routes/recipe';
import tagRoutes from './routes/tag';
import signInRoutes from './routes/signin';
import signUpRoutes from './routes/signup';

const app = express();
const port = process.env.port || 3090;

app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

//using imported routes
app.use(recipeRoutes);
app.use(tagRoutes);
app.use(signInRoutes);
app.use(signUpRoutes);

app.listen(port, () => {
    console.log("Server listening on port ", port);
});
