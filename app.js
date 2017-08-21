import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import signUpRoutes from './routes/signup';

const app = express();
const port = process.env.port || 3090;

app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

//using imported routes
app.use(signUpRoutes);

app.listen(port, () => {
    console.log("Server listening on port ", port);
});
