import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import database from './config/database';
import api from './routes/api';
import logger from './utils/logger';
import bigbrother from './middlewares/bigbrother';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

database();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(cors());

app.use(bigbrother);
app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
    logger.log(`server started on ${PORT}`)
});