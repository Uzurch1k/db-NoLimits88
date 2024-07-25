import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/auth.js';
import {
  addWaterRecordSchema,
  updateWaterRecordSchema,
} from '../validation/water.js';
import {
  addWaterRecord,
  updateWaterRecord,
  deleteWaterRecord,
  getWaterPerDayController,
  getWaterPerMonthController,
} from '../controllers/water.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  validateBody(addWaterRecordSchema),
  ctrlWrapper(addWaterRecord)
);

router.put(
  '/:id',
  validateBody(updateWaterRecordSchema),
  ctrlWrapper(updateWaterRecord)
);

router.delete('/:id', ctrlWrapper(deleteWaterRecord));

router.get('/day/:date', ctrlWrapper(getWaterPerDayController));
router.get('/month/:month', ctrlWrapper(getWaterPerMonthController));

export default router;
