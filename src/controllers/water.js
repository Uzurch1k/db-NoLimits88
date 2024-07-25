import { WaterRecord } from '../db/models/water.js';
import dayjs from 'dayjs';

export const addWaterRecord = async (req, res) => {
  const { amount, date } = req.body;
  const owner = req.user._id;

  const newRecord = await WaterRecord.create({ amount, date, owner });
  res.status(201).json({ status: 'success', data: newRecord });
};

export const updateWaterRecord = async (req, res) => {
  const { id } = req.params;
  const { amount, date } = req.body;
  const owner = req.user._id;

  const updatedRecord = await WaterRecord.findOneAndUpdate(
    { _id: id, owner },
    { amount, date },
    { new: true }
  );

  if (!updatedRecord) {
    return res.status(404).json({ status: 'error', message: 'Record not found' });
  }

  res.status(200).json({ status: 'success', data: updatedRecord });
};

export const deleteWaterRecord = async (req, res) => {
  const { id } = req.params;
  const owner = req.user._id;

  const deletedRecord = await WaterRecord.findOneAndDelete({ _id: id, owner });

  if (!deletedRecord) {
    return res.status(404).json({ status: 'error', message: 'Record not found' });
  }

  res.status(200).json({ status: 'success', message: 'Record deleted' });
};

export const getDailyWaterConsumption = async (req, res) => {
  const owner = req.user._id;
  const today = dayjs().startOf('day');

  const dailyRecords = await WaterRecord.find({
    owner,
    date: {
      $gte: today.toDate(),
      $lt: today.add(1, 'day').toDate()
    }
  });

  res.status(200).json({ status: 'success', data: dailyRecords });
};

export const getMonthlyWaterConsumption = async (req, res) => {
  const owner = req.user._id;
  const startOfMonth = dayjs().startOf('month');

  const monthlyRecords = await WaterRecord.find({
    owner,
    date: {
      $gte: startOfMonth.toDate(),
      $lt: startOfMonth.add(1, 'month').toDate()
    }
  });

  res.status(200).json({ status: 'success', data: monthlyRecords });
};

export const getWaterPerDayController = async (req, res) => {
  const { date } = req.params;
  const owner = req.user._id;

  const startOfDay = dayjs(date).startOf('day');
  const endOfDay = dayjs(date).endOf('day');

  const records = await WaterRecord.find({
    owner,
    date: {
      $gte: startOfDay.toDate(),
      $lte: endOfDay.toDate()
    }
  });

  res.status(200).json({ status: 'success', data: records });
};

export const getWaterPerMonthController = async (req, res) => {
  const { month } = req.params;
  const owner = req.user._id;

  const startOfMonth = dayjs(month).startOf('month');
  const endOfMonth = dayjs(month).endOf('month');

  const records = await WaterRecord.find({
    owner,
    date: {
      $gte: startOfMonth.toDate(),
      $lte: endOfMonth.toDate()
    }
  });

  res.status(200).json({ status: 'success', data: records });
};
