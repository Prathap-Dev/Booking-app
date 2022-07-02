import express from 'express';
import { login, register, signout } from '../controllers/auth.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//REGISTER USER
router.post('/register', register)
//LOGIN USER
router.post('/login', login)
//LOGOUT USER
router.post('/logout', signout)

export default router;