const Course = require("../models/course.model");
const { validationResult } = require("express-validator");
const HST = require("../utils/httpStatusText");
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../utils/appError");

//* CRUD operations
//^ Create a new course {POST}
const createCourse = catchAsync(async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    const err = AppError.create(errors.array(), 400, HST.ERROR);
    return next(err);
  }

  //# insert a new course
  const courses = await Course.insertMany(req.body);

  res.json(courses);
});

//^ Read All Courses {GET}
const getCourses = catchAsync(async (req, res, next) => {
  //^ adding pagenagion
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const allCourses = await Course.find({}, { __v: false })
    .limit(limit)
    .skip(skip);

  res.json(allCourses);
});

//^ Read One Course {GET}
const getCourse = catchAsync(async (req, res, next) => {
  const courseId = req.params.courseId;
  const foundCourse = await Course.findById(courseId);

  if (!foundCourse) {
    // return res.status(404).json({ error: "Course not found" });
    const err = AppError.create("course not found!", 404, HST.ERROR);
    return next(err);
  }

  res.json(foundCourse);
});

//^ Update course {PATCH}
const updateCourse = catchAsync(async (req, res, next) => {
  let { courseId } = req.params;
  const foundCourse = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
  });

  if (!foundCourse) {
    // return res.status(404).json({ error: "Course not found!" });
    const err = AppError.create("course not found!!", 404, HST.ERROR);
    return next(err);
  }

  res.json(foundCourse);
});

//^ Delete course {DELETE}
const deleteCourse = catchAsync(async (req, res, next) => {
  const courseId = req.params.courseId;
  const foundCourse = await Course.findByIdAndDelete(courseId);

  if (!foundCourse) {
    // return res.status(404).json({ error: "not found ourse!!!" });
    const err = AppError.create("course not found!!!", 404, HST.ERROR);
    return next(err);
  }

  res.status(204).json(foundCourse);
});

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
