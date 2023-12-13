const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseControllers');
const {
  validateNewCourse,
  validateUpdatedCourse,
} = require('../middlewares/validationSchema');
const verifyToken = require('../middlewares/verifyToken');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middlewares/allowedTo');

// Combine multiple HTTP methods on the same route '/'
router
  .route('/')
  .get(courseController.getCourses)
  .post(
    verifyToken,
    allowedTo(userRoles.MANAGER, userRoles.ADMIN),
    validateNewCourse,
    courseController.createCourse
  );

// Combine multiple HTTP methods on the same route '/:courseId'
router
  .route('/:courseId')
  .get(courseController.getCourse)
  .patch(
    validateUpdatedCourse,
    verifyToken,
    allowedTo(userRoles.MANAGER, userRoles.ADMIN),
    courseController.updateCourse
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.MANAGER, userRoles.ADMIN),
    courseController.deleteCourse
  );

module.exports = router;
