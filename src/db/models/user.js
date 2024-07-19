import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    gender: {
      type: String,
      enum: ['Woman', 'Men'],
      required: false,
    },
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    weight: { type: Number, required: false },
    activeTime: { type: Number, required: false },
    amountOfWater: { type: Number, required: false },
  },
  { timestamps: true, versionKey: false }
);

export const UsersCollection = model('users', usersSchema);
