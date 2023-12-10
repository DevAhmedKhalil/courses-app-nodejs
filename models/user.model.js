const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: [validator.isEmail, 'field must be a valid email'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.USER, userRoles.MANAGER],
    default: userRoles.USER,
  },
  avatar: {
    type: String,
    default: 'uploads/profile.png',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
