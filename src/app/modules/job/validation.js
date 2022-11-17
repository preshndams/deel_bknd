import Joi from "joi";
export default {
  listJob: {
    query: {
      schema: Joi.object({
        paid: Joi.string().valid("true", "null", "false").required(),
      }),
    },
  },

  view: {
    params: {
      schema: Joi.object({
        id: Joi.number().integer().required(),
      }),
    },
  },

  pay: {
    params: {
      schema: Joi.object({
        job_id: Joi.number().integer().required(),
      }),
    },
    headers: {
      schema: Joi.object({
        profile_id: Joi.number().integer().required().messages({
          "any.required":
            "profile_id is required in req.headers; eg profile_id=2",
          "any.empty": "profile_id is required in req.headers; eg profile_id=2",
        }),
      }),
      options: {
        allowUnknown: true,
      },
    },
  },
};
