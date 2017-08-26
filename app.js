
import express from 'express';

import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import recipeRoutes from './routes/recipe';
import categoryRoutes from './routes/category';

const app = express();
const port = process.env.port || 3090;

app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.use(recipeRoutes);
app.use(categoryRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log("Server listening on port ", port);
});