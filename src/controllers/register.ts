import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import logger from "../utils/logger";
import cleanip from "../utils/cleanip";
import user from "../models/user";

export default async (req: Request, res: Response) => {
    const username = req.body['username'];
    const password = await bcrypt.hash(req.body['password'], 10);

    if(!username || !password) return;

    new user({
        username: username,
        password: password,
        isAdmin: false
    }).save()
    .then(() => {
        logger.log(`${cleanip(req.socket.remoteAddress)} made a new account. Name: ${username}.`, 'ADMIN REGISTER');
    })
    .catch(() => {
        logger.error(`${cleanip(req.socket.remoteAddress)} caused a registration error.`, 'ADMIN REGISTER');
    })
}