import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  gender: Joi.string().valid('Woman', 'Men').messages({
    'string.base': 'User type should be a one of "Woman" or "Men"',
  }),
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.empty': 'The username cannot be empty',
    'string.min': 'Username should have at least 3 characters',
    'string.max': 'Username should have at most 20 characters',
  }),
  email: Joi.string()
    .email()
    .messages({ 'string.base': 'Email should be a string' }),
  weight: Joi.number().integer().messages({
    'number.base': 'Weight should be a number',
  }),
  activeTime: Joi.number().integer().required().messages({
    'number.base': 'Active time should be a number',
  }),
  amountOfWater: Joi.number().integer().required().messages({
    'number.base': 'Amount of water should be a number',
  }),
  photo: Joi.string
});
