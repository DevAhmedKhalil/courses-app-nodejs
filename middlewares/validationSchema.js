const { body } = require("express-validator");

// Validation middleware for creating a new course
const validateNewCourse = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be string"),
  body("price").isNumeric().withMessage("Price must be a number"),
];

// Validation middleware for updating a course
const validateUpdatedCourse = [
  body("title").optional().notEmpty().withMessage("Title is required"),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
];

module.exports = {
  validateNewCourse,
  validateUpdatedCourse,
};
