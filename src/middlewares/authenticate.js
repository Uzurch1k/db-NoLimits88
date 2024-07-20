import jwt from 'jsonwebtoken';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env('JWT_SECRET'));
    const user = await UsersCollection.findById(decoded.id);

    if (!user) {
      return next(createHttpError(401, 'Unauthorized'));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(createHttpError(401, 'Unauthorized'));
  }
};
