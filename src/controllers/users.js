import { getUserById, updateUser } from '../services/users.js';
import createHttpError from 'http-errors';
import { registerUser } from '../services/users.js';
import { loginUser, refreshUsersSession } from '../services/users.js';
import { logoutUser } from '../services/users.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getUserCountAndPhotos } from '../services/users.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const { user, session } = await loginUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      user: user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser(req.user._id);

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    refreshToken: req.body.refreshToken,
  });

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  });
};

export const getCurrentUserController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const User = await getUserById(userId);

    res.status(200).json({
      status: 200,
      message: `Current user information!`,
      data: User,
    });
  } catch (error) {
    next(error);
  }
};

export const patchUserController = async (req, res, next) => {
  const userId = req.user._id;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateUser(userId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a user!`,
    data: result.user,
  });
};

export const getUserCountAndPhotosController = async (req, res) => {
  try {
    const { count, photos } = await getUserCountAndPhotos();
    res.status(200).json({ count, photos });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
