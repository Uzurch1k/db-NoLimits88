import { Router } from 'express';
import {
  getUserByIdController,
  patchUserController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/users.js';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = Router();

contactRouter.use(authenticate);
contactRouter.get('/:userId', ctrlWrapper(getUserByIdController));
contactRouter.patch(
  '/:userId',
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController)
);

export default userRouter;
