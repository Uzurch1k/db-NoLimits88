import { Router } from 'express';
import {
  getCurrentUserController,
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
import { upload } from '../middlewares/multer.js';

const router = Router();

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

router.get('/current', auth, ctrlWrapper(getCurrentUserController));

router.patch(
  '/update/:id',
  auth,
  upload.single('photo'),
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController)
);

export default router;
