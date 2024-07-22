import { Router } from 'express';
import {
  getUserByIdController,
  patchUserController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/users.js';
import { auth } from '../middlewares/authenticate.js';
import { registerUserSchema } from '../validation/users.js';
import {
  registerUserController,
  refreshUserSessionController,
} from '../controllers/users.js';
import { loginUserSchema } from '../validation/users.js';
import { loginUserController } from '../controllers/users.js';
import { logoutUserController } from '../controllers/users.js';

const router = Router();

// router.use(auth);

router.post(
  '/signup',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);

router.post(
  '/signin',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.get('/:userId', ctrlWrapper(getUserByIdController));

router.patch(
  '/:userId',
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController)
);

export default router;
