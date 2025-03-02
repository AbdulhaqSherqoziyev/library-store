const Joi = require('joi');

const orderSchema = Joi.object({
  userId: Joi.number().required(),
  items: Joi.array()
    .items(
      Joi.object({
        bookId: Joi.number().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
});

module.exports = orderSchema;