const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().min(6).required().email(),
  });
  const valid = schema.validate(data);
  return valid;
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });
  const valid = schema.validate(data);
  return valid;
};

module.exports = {
    registerValidation,
    loginValidation
};