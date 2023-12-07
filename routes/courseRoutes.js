const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseControllers");
const {
  validateNewCourse,
  validateUpdatedCourse,
} = require("../middlewares/validationSchema");

//* CRUD operations
//@ Create a new course {POST}
router.post("/api/courses", validateNewCourse, courseController.createCourse);

//@ Read All Courses {GET}
router.get("/api/courses", courseController.getCourses);

//@ Read One Course {GET}
router.get("/api/courses/:courseId", courseController.getCourse);

//@ Update course {PATCH}
router.patch(
  "/api/courses/:courseId",
  validateUpdatedCourse,
  courseController.updateCourse
);

//@ Delete course {DELETE}
router.delete("/api/courses/:courseId", courseController.deleteCourse);

module.exports = router;
