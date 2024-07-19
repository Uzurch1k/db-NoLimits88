import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    gender: {
      type: String,
      enum: ['Woman', 'Men'],
    },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    weight: { type: Number },
    activeTime: { type: Number },
    amountOfWater: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

export const UsersCollection = model('users', usersSchema);
