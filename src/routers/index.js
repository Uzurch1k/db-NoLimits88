import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import waterRouter from './water.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/water', auth, waterRouter);

export default router;
