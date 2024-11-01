import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import user from "../models/user";
import logger from "../utils/logger";

export default (req: Request, res: Response) => {
    const username = req.body['username'];
    const password = req.body['password'];
    const token_secret = process.env.TOKEN_SECRET;
    const token_lifetime = process.env.TOKEN_LIFETIME || '24h';

    user.findOne({ username: username })
    .then(async user => {
        const errorMessage = 'Неверное имя пользователя или пароль.';
        if(!user) return res.status(404).json({ message: errorMessage });

        const isPasswordCorrect = await bcrypt.compare(password, user['password']);
        if(!isPasswordCorrect) return res.status(403).json({ message: errorMessage });

        const token = jwt.sign({ username: username }, token_secret!, { expiresIn: token_lifetime! });
        res.status(200).json({ message: 'ok', token: token });
    })
    .catch((err) => {
        logger.error(err, 'ADMIN LOGIN')
    });
}