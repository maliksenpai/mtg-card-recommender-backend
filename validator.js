const { checkSchema, validationResult } = require("express-validator");

const validateCommander = checkSchema({
  "commander.name": {
    in: ["body"],
    isString: true,
    errorMessage: "Commander name must be a string",
  },
  "commander.image_uris": {
    in: ["body"],
    isObject: true,
    errorMessage: "Commander image_uris must be an object",
  },
  "commander.id": {
    in: ["body"],
    isUUID: { version: 4 },
    errorMessage: "Commander id must be a valid ID",
  },
  "commander.colors": {
    in: ["body"],
    isArray: true,
    errorMessage: "Commander colors must be an array",
  },
  "commander.oracle_text": {
    in: ["body"],
    isString: true,
    errorMessage: "Commander oracle_text must be a string",
  },
});

const validateFilter = checkSchema({
  "filter.cardColor": {
    in: ["body"],
    optional: true,
    isArray: true,
    errorMessage: "Filter cardColor must be an array",
  },
  "filter.cardType": {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Filter cardType must be a string",
  },
  "filter.cardAggresive": {
    in: ["body"],
    optional: true,
    isIn: {
      options: [["Control", "Aggresive", "Combo", "Mid Range"]],
      errorMessage:
        "Filter cardAggresive must be one of: Control, Aggresive, Combo, Mid Range",
    },
  },
});

const validateRecommendedCards = checkSchema({
  recommendedCards: {
    in: ["body"],
    optional: true,
    isArray: true,
    errorMessage: "recommendedCards must be an array",
    custom: {
      options: (value) => {
        // Her bir elemanın string olup olmadığını kontrol et
        return value.every((item) => typeof item === "string");
      },
      errorMessage: "Each item in recommendedCards must be a string",
    },
  },
});

const validateRequest = [
  validateCommander,
  validateFilter,
  validateRecommendedCards,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateRequest;
