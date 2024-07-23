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
    photo: { type: String },
  },
  { timestamps: true, versionKey: false }
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
