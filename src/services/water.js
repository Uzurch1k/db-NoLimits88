import { WaterConsumption } from '../db/models/water.js';

export const addWaterConsumption = async (data) => {
  return await WaterConsumption.create(data);
};

export const updateWaterConsumption = async (id, data) => {
  return await WaterConsumption.findByIdAndUpdate(id, data, { new: true });
};

export const deleteWaterConsumption = async (id) => {
  return await WaterConsumption.findByIdAndDelete(id);
};
