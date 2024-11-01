import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import cleanip from "../utils/cleanip";
import logger from "../utils/logger";

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return;

    jwt.verify(token, process.env.TOKEN_SECRET!, (err, user) => {
        if (err) return res.status(401).json({ message: 'bad' });
        logger.log(`${cleanip(req.socket.remoteAddress)} token is valid`, 'TOKEN');
        next();
    });
}