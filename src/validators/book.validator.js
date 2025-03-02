const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  authorId: Joi.number().required(),
  publisherId: Joi.number().required(),
  categoryId: Joi.number().required(),
});

module.exports = bookSchema;