import Joi from 'joi';

export const addWaterRecordSchema = Joi.object({
  amount: Joi.number().required(),
  date: Joi.date().optional(),
});

export const updateWaterRecordSchema = Joi.object({
  amount: Joi.number().required(),
  date: Joi.date().optional(),
});
