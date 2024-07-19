import mongoose from 'mongoose';
import { getUserById, updateUser } from '../services/users.js';
import createHttpError from 'http-errors';

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
    message: 'Successfully patched a User!',
    data: patch.User,
  });
};
