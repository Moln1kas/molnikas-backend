import express from 'express';

import login from '../controllers/login';
import register from '../controllers/register';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/auth', auth, (req, res) => {
    res.status(200).json({ message: 'ok' });
 })

export default router;