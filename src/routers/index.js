import { Router } from 'express';
import userRouter from './users.js';
import waterRouter from './water.js';

const router = Router();

router.use('/users', userRouter);
router.use('/water', waterRouter);

export default router;
