import { UsersCollection } from '../db/models/user.js';

export const getUserById = async userId => {
  const users = await UsersCollection.findOne({ _id: userId });
  return users;
};

export const updateUser = async (userId, payload, options = {}) => {
  const rawPatch = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    {
      new: true,
      includeResultMetadana: true,
      ...options,
    }
  );
  if (!rawPatch) return null;
  return {
    user: rawPatch,
    isNew: Boolean(rawPatch?.lastErrorObject?.upserted),
  };
};
