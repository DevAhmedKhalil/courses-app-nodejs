const User = require('../models/user.model');
const catchAsync = require('../middlewares/catchAsync');
const AppError = require('../utils/appError');
const HST = require('../utils/httpStatusText');
const bcrypt = require('bcryptjs');
const genereateJWT = require('../utils/generateJWT');

//* CRUD operations
//^ [CREATE] Register a new user
const registerUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  console.log('req.file -->', req.file); // from multer upload.single('avatar')

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    const err = AppError.create(
      `User Already Registered With Email: ${oldUser.email}`,
      409,
      HST.ERROR
    );
    return next(err);
  }

  //! Password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename,
  });

  // Generate JWT token => with email, id, role [iat, exp]
  const token = await genereateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;

  await newUser.save();

  // Exclude the '__v' and 'password' field from the response
  const simpleUser = newUser.toObject();
  delete simpleUser.__v;
  delete simpleUser.password;

  res.status(201).json({
    message: 'User registered successfully',
    user: simpleUser,
  });
});

//^ [GET] Read all users
const getUsers = catchAsync(async (req, res, next) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  //# Get all users form DB user User model
  const users = await User.find({}, { __V: false, password: false })
    .limit(limit)
    .skip(skip);

  res.status(200).json(users);
});

//^ [GET] Read single user
const getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const foundUser = await User.findById(userId);

  if (!foundUser) {
    // return res.status(404).json({ error: "not found ourse!!!" });
    const err = AppError.create('user not found!!!', 404, HST.ERROR);
    return next(err);
  }

  console.log('GET Single User ->', foundUser);
  res.status(200).json({ foundUser });
});

//^ {Login}
const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !password) {
    const err = AppError.create('Email or Password Not Valid!', 401, HST.ERROR);
    return next(err);
  }

  // Check if the provided password matches the stored hashed password
  const matchedPassword = await bcrypt.compare(password, user.password);

  if (!matchedPassword) {
    const err = AppError.create('Email or Password Not Valid!', 401, HST.ERROR);
    return next(err);
  }

  //# Best Case: Login
  if (user && matchedPassword) {
    // logged in successfully
    const token = await genereateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });

    return res.json({
      status: HST.SUCCESS,
      data: { user: 'Logged in Successfully', token: token },
    });
  } else {
    const err = AppError.create('Something went wrong', 400, HST.ERROR);
    return next(err);
  }
});

//^ [PATCH] Update user
// Update User Function
const updateUser = catchAsync(async (req, res, next) => {
  let { userId } = req.params;
  // console.log('User ID:', userId);

  // Ensure that req.body contains the correct update fields
  // console.log('Request Body:', req.body);

  const foundUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  // console.log('Found User:', foundUser);

  if (!foundUser) {
    const err = AppError.create('User not found!!', 404, HST.ERROR);
    return next(err);
  }

  res.status(200).json({ message: 'Updated course', data: foundUser });
});

//^ [DELETE] Delete user
const deleteUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const foundUser = await User.findByIdAndDelete(userId);

  if (!foundUser) {
    // return res.status(404).json({ error: "not found ourse!!!" });
    const err = AppError.create('user not found!!!', 404, HST.ERROR);
    return next(err);
  }

  console.log('User Deleted =>', userId);
  res.json({ status: 'user deleted', data: null }).status(204);
});

module.exports = {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
