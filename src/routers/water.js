import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/auth.js';  
import { addWaterRecordSchema, updateWaterRecordSchema } from '../validation/water.js';
import { addWaterRecord, updateWaterRecord, deleteWaterRecord } from '../controllers/water.js';

const router = Router();

router.post(
  '/',
  authenticate,
  validateBody(addWaterRecordSchema),
  ctrlWrapper(addWaterRecord)
);

router.put(
  '/:id',
  authenticate,
  validateBody(updateWaterRecordSchema),
  ctrlWrapper(updateWaterRecord)
);

router.delete(
  '/:id',
  authenticate,
  ctrlWrapper(deleteWaterRecord)
);

export default router;
