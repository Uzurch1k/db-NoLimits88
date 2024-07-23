import jwt from 'jsonwebtoken';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Not authenticated' });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UsersCollection.findById(id);

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Not authenticated' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Not authenticated' });
  }
};
