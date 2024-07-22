import { 
  addWaterConsumption, 
  updateWaterConsumption, 
  deleteWaterConsumption,
  getWaterPerDay,
} from '../services/water.js';

export const addWaterConsumptionController = async (req, res) => {
  const userId = req.user.id; 
  const data = { ...req.body, userId };
  const waterConsumption = await addWaterConsumption(data);

  res.json({
    status: 201,
    message: 'Water consumption record added successfully!',
    data: waterConsumption,
  });
};

export const updateWaterConsumptionController = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const waterConsumption = await updateWaterConsumption(id, data);

  res.json({
    status: 200,
    message: 'Water consumption record updated successfully!',
    data: waterConsumption,
  });
};

export const deleteWaterConsumptionController = async (req, res) => {
  const { id } = req.params;
  await deleteWaterConsumption(id);

  res.json({
    status: 200,
    message: 'Water consumption record deleted successfully!',
  });
};

export const getWaterPerDayController = async (req, res, next) => {
  const { date } = req.params;
  const userId = req.user.id;

  const result = await getWaterPerDay(userId, date);

  res.status(200).json({
    status: 200,
    message: `Successfully!`,
    data: result.value,
    dailyAmount: result.totalAmount,
    dailyPercentage: result.totalPercentage,
  });
};