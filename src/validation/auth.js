import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  gender: Joi.string().valid('Woman', 'Men'),
  name: Joi.string().min(3).max(30),
  weight: Joi.Number().min(1).max(3),
  activeTime: Joi.Number().min(1).max(3),
  amountOfWater: Joi.Number().min(1).max(15),
});
