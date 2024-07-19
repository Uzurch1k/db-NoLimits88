import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { addWaterConsumptionController, updateWaterConsumptionController, deleteWaterConsumptionController } from '../controllers/water.js';
import { validateBody } from '../middlewares/validateBody.js';
import { addWaterConsumptionSchema, updateWaterConsumptionSchema } from '../validation/water.js';

const router = Router();

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

export default router;
