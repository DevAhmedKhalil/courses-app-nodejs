# Courses App (Node.js) - Version 3 (Maybe the last)

## Overview

- This project presents a course management system with functionalities to Create, Read, Update, and Delete (CRUD) courses.
- Version 3 now uses MongoDB, which helps to store and retrieve data more effectively.

### New Features in Version 3

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

## Installation

1. Install Node.js and MongoDB.
2. Clone this repository.
3. Run `npm install` to install dependencies.
4. Set up MONGODB_URI connection in `config.env`.
5. Start the application with `npm start`.
6. Access the app at `http://localhost:3000`.

This new version makes managing both courses and users more efficient and provides essential user authentication features.
