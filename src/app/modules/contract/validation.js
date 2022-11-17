import Joi from "joi";
export default {
  getContract: {
    params: {
      schema: Joi.object({
        id: Joi.number().integer().required(),
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
