import mongoose from 'mongoose';
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

export const getWaterPerDay = async (userId, date) => {
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(startDate);
  endDate.setHours(23, 59, 59, 999);

  const waterIntake = await WaterConsumption.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId), date: { $gte: startDate, $lte: endDate } } },
    { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
  ]);

  const totalAmount = waterIntake.length ? waterIntake[0].totalAmount : 0;

  const dailyGoal = 2000;
  const totalPercentage = (totalAmount / dailyGoal) * 100;

  return {
    value: waterIntake,
    totalAmount,
    totalPercentage: totalPercentage > 100 ? 100 : totalPercentage
  };
};
