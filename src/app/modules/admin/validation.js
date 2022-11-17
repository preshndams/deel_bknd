import Joi from "joi";
export default {
  getHighestProfession: {
    query: {
      schema: Joi.object({
        start: Joi.date().raw(),
        end: Joi.date().raw().greater(Joi.ref("start")).required(),
      }),
    },
  },

  getBestClient: {
    query: {
      schema: Joi.object({
        start: Joi.date().raw(),
        end: Joi.date().raw().greater(Joi.ref("start")).required(),
        limit: Joi.number().integer().default(2),
      }),
    },
  },
};
