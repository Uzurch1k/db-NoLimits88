import { Router } from 'express';
import {
  getUserByIdController,
  patchUserController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/users.js';
import { auth } from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.use(auth);
userRouter.get('/:userId', ctrlWrapper(getUserByIdController));
userRouter.patch(
  '/:userId',
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController)
);

export default userRouter;
