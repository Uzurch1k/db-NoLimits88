import { addWaterConsumption, updateWaterConsumption, deleteWaterConsumption } from '../services/water.js';

export const addWaterConsumptionController = async (req, res) => {
  const userId = req.user.id; // Припускаємо, що user ID додається до req після авторизації
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
