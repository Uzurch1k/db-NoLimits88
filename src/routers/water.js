import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { 
  addWaterConsumptionController, 
  updateWaterConsumptionController, 
  deleteWaterConsumptionController, 
  getWaterPerDayController
} from '../controllers/water.js';
import { validateBody } from '../middlewares/validateBody.js';
import { 
  addWaterConsumptionSchema, 
  updateWaterConsumptionSchema 
} from '../validation/water.js';
import { auth } from '../middlewares/authenticate.js';

const router = Router();

router.use(auth);

router.post(
  '/',
  validateBody(addWaterConsumptionSchema),
  ctrlWrapper(addWaterConsumptionController)
);

router.put(
  '/:id',
  validateBody(updateWaterConsumptionSchema),
  ctrlWrapper(updateWaterConsumptionController)
);

router.delete(
  '/:id',
  ctrlWrapper(deleteWaterConsumptionController)
);

router.get(
  '/day/:date', 
  ctrlWrapper(getWaterPerDayController));

export default router;
