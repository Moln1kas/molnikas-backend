import mongoose from 'mongoose';

import logger from '../utils/logger';

export default async () => {
    await mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        logger.log('database successfully connected');
    })
    .catch(error => {
        logger.error(`database connection error: ${error.message}`);
    });
}