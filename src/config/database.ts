import mongoose from 'mongoose'

import logger from '../utils/logger'

export default async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/molnikas');
        logger.log('database successfully connected')
    } catch (error: any) {
        logger.error(`database connection error: ${error.message}`);
        process.exit(1);
    }
}