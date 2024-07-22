import { model, Schema } from 'mongoose';

const waterConsumptionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const WaterConsumption = model('waterConsumption', waterConsumptionSchema);
