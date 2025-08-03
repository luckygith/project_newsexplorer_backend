const { Joi, celebrate } = require("celebrate");

const validator = require("validator");

// validation for URL as built in url() is not strict

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};
// In Joi, HELPERS provide additional customization and flexibility when
// defining validation rules. They are often used inside .message(), .custom(),
// or advanced validation methods.

// validation functions for spec input bodies

module.exports.validateClothingItemBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "string.empty": 'The "weather" field must be filled in',
      "any.only": 'The "weather" field must be one of: hot, warm, cold',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The 'imageUrl' field must be filled",
      "string.uri" : "The 'imageUrl' field must be a valid url",
    }),
  }),
});





module.exports.validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().custom(validateURL).messages({
      "string.empty": "The 'avatar' field must be filled",
      "string.uri" : "The 'avatar' field must be a valid url",
    }),
    email: Joi.string().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email field must be a valid email',
    }),

    password: Joi.string().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateUserLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email field must be a valid email',
    }),

    password: Joi.string().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateUserItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex() , // length is explicitly 24 / only hexadecimal characters (0-9, a-f) are allowed
  }),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
  }),
  avatar: Joi.string().custom(validateURL).messages({
    "string.empty": "The 'avatar' field must be filled",
    "string.uri" : "The 'avatar' field must be a valid url",
}),
}),
});

// params: Used when the data is part of the URL path (e.g., /items/:itemId).
// body: Used when the data is sent in the request body (e.g., in a POST or PUT request).

