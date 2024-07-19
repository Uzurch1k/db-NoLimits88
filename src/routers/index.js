import { Router } from 'express';
import authRouter from './auth.js';
import waterRouter from './water.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/water', auth, waterRouter);

export default router;
