import { Schema, model } from 'mongoose';

const waterRecordSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const WaterRecord = model('WaterRecord', waterRecordSchema);
