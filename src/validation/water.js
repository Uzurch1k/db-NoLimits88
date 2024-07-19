import Joi from 'joi';

export const addWaterConsumptionSchema = Joi.object({
  date: Joi.date().required(),
  amount: Joi.number().required(),
});

export const updateWaterConsumptionSchema = Joi.object({
  date: Joi.date(),
  amount: Joi.number(),
});
