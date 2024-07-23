import {
  WaterRecord,
} from '../db/models/water.js';

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
    return res
      .status(404)
      .json({ status: 'error', message: 'Record not found' });
  }

  res.status(200).json({ status: 'success', data: updatedRecord });
};

export const deleteWaterRecord = async (req, res) => {
  const { id } = req.params;
  const owner = req.user._id;

  const deletedRecord = await WaterRecord.findOneAndDelete({ _id: id, owner });

  if (!deletedRecord) {
    return res
      .status(404)
      .json({ status: 'error', message: 'Record not found' });
  }

  res.status(200).json({ status: 'success', message: 'Record deleted' });
};

