<div align="center">
  <img src="https://www.svgrepo.com/show/376337/node-js.svg" alt="Node.js Logo" width="220" height="220">
</div>

# Courses App (Node.js)

## Overview

This project presents a course management system with functionalities to Create, Read, Update, and Delete (CRUD) courses. now uses MongoDB, providing more effective data storage and retrieval.

### New Features

1. **User Management:**

   - The addition of `userControllers` provides functionalities for managing users within the application.
   - Users can be created, read, and deleted with corresponding API endpoints.

2. **User Registration:**

   - The `registerUser` function allows the registration of a new user by providing details such as first name, last name, email, password, and role.
   - The user's password is securely hashed before being stored in the database.
   - JWT token is generated upon successful registration.

3. **User Login:**

   - The `loginUser` function facilitates user login by validating the provided email and password.
   - Upon successful login, a JWT token is generated for authentication.

4. **User Deletion:**
   - The `deleteUser` function enables the deletion of a user by providing the user's ID.
   - The deleted user is removed from the database.

## Roles and Permissions

- **Admin:** Can perform CRUD operations on both courses and users.
- **Manager:** Can add, update, and delete courses.
- **User:** Can register, login, update their information, and delete their account.

## Installation

1. Install Node.js and MongoDB.
2. Clone this repository.
3. Run `npm install` to install dependencies.
4. Set up MONGODB_URI connection in `config.env`.
5. Start the application with `npm start`.
6. Access the app at `http://localhost:3000`.

## Usage

- The application provides API endpoints for managing courses and users.
- Courses can be created, read, updated, and deleted.
- Users can be registered, logged in, and deleted.
- Access specific routes based on user roles (admin, manager).

## File Structure

- `controllers/`: Contains the logic for handling HTTP requests.
- `middlewares/`: Custom middleware functions.
- `models/`: MongoDB models for courses and users.
- `routes/`: Express routes for courses and users.
- `uploads/`: Directory for storing uploaded files (avatars).
- `utils/`: Utility functions, constants, and error handling.

## Dependencies

- Express: Web framework for Node.js.
- Mongoose: MongoDB object modeling for Node.js.
- Bcryptjs: Library for hashing passwords.
- Jsonwebtoken: JSON Web Token (JWT) generation and verification.
- Multer: Middleware for handling file uploads.
- Express-validator: Middleware for request validation.

## Contributing

- Feel free to contribute by opening issues or creating pull requests.
