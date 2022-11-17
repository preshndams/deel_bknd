import Joi from "joi";
export default {
  deposit: {
    body: {
      schema: Joi.object({
        amount: Joi.number().integer().required(),
      }),
    },
    params: {
      schema: Joi.object({
        userId: Joi.number().integer().required(),
      }),
    },
  },

  view: {
    params: {
      schema: Joi.object({
        userId: Joi.number().integer().required(),
      }),
    },
  },
};
