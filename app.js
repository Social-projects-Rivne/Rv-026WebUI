import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import recipeRoutes from './routes/recipe';

const app = express();
const port = process.env.port || 3090;

app.use(morgan('combined'));

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.use(recipeRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log("Server listening on port ", port);
});
                                                 
