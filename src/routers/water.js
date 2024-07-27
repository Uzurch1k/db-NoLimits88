import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
// import { authenticate } from '../middlewares/auth.js';
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
import { auth } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  // authenticate,
  validateBody(addWaterRecordSchema),
  ctrlWrapper(addWaterRecord)
);

router.put(
  '/:id',
  // authenticate,
  validateBody(updateWaterRecordSchema),
  ctrlWrapper(updateWaterRecord)
);

router.delete('/:id', ctrlWrapper(deleteWaterRecord));

router.get('/day/:date', ctrlWrapper(getWaterPerDayController));

router.get('/month/:month', ctrlWrapper(getWaterPerMonthController));

export default router;
