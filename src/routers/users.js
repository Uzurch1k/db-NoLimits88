import { Router } from 'express';
import {
  getCurrentUserController,
  patchUserController,
  registerUserController,
  refreshUserSessionController,
  loginUserController,
  logoutUserController,
  getUserCountAndPhotosController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { auth } from '../middlewares/authenticate.js';
import { registerUserSchema, updateUserSchema } from '../validation/users.js';
import { loginUserSchema } from '../validation/users.js';
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

router.post('/logout', auth, ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.get('/current', auth, ctrlWrapper(getCurrentUserController));

router.patch(
  '/update',
  auth,
  upload.single('photo'),
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController)
);

router.get('/count', ctrlWrapper(getUserCountAndPhotosController));

export default router;
