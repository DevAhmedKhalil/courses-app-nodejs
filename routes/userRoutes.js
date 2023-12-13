const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const verifyToken = require('../middlewares/verifyToken');
const appError = require('../utils/appError');
const multer = require('multer');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/userRoles');
const { validateUpdatedCourse } = require('../middlewares/validationSchema');

const diskStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    // console.log('File: ' + JSON.stringify(file).split(',').join('\n'));
    callback(null, 'uploads');
  },
  filename: function (req, file, callback) {
    const photoExtention = file.mimetype.split('/')[1];
    const photoName = `${req.body.email}-${Date.now()}.${photoExtention}`;
    callback(null, photoName);
  },
});

const fileFilter = (req, file, callback) => {
  const imageType = file.mimetype.split('/')[0];
  if (imageType === 'image') {
    return callback(null, true);
  } else {
    return callback(appError.create('The file must be an image!', 400), false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

//# GET all users
router
  .route('/')
  .get(verifyToken, allowedTo(userRoles.ADMIN), userController.getUsers);

//# GET, UPDATE, DELETE By => ID
router
  .route('/:userId')
  .get(verifyToken, allowedTo(userRoles.ADMIN), userController.getUser)
  .patch(
    validateUpdatedCourse,
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    userController.updateUser
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    userController.deleteUser
  );

//# Register
router
  .route('/register')
  .post(upload.single('avatar'), userController.registerUser);

//# Login
router.route('/login').post(userController.loginUser);

module.exports = router;
