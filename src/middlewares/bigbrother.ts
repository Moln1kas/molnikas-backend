import { Request, Response, NextFunction } from "express";
import logger from '../utils/logger';
import cleanip from "../utils/cleanip";

export default (req: Request, res: Response, next: NextFunction) => {
    logger.log(`${cleanip(req.socket.remoteAddress)} making a ${req.method} request on ${req.path}`, 'BIG BROTHER');
    next();
}