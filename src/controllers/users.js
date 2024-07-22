import mongoose from 'mongoose';
import { getUserById, updateUser } from '../services/users.js';
import createHttpError from 'http-errors';
import { registerUser } from '../services/users.js';
import { loginUser, refreshUsersSession } from '../services/users.js';
import { ONE_DAY } from '../constants/index.js';
import { logoutUser } from '../services/users.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};


export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();

};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully refreshed a session',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const getUserByIdController = async (req, res, next) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      data: 'Id is not valid',
    });
  }

  const User = await getUserById(userId);
  if (!User) {
    next(createHttpError(404, 'User not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
    data: User,
  });
};

export const patchUserController = async (req, res, next) => {
  const { userId } = req.params;

  const patch = await updateUser(userId, req.body);
  if (!patch) {
    next(createHttpError(404, 'Not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a user!',
    data: patch.user,
  });
};
