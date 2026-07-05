# Backend API Development Project - internship Portfolio

This project is a complete, modular, and lightweight Backend RESTful API built using Node.js and Express.js. It implements a simple user management system without a database, instead storing data in a local JSON file (`data/users.json`) with asynchronous file reading/writing. 

This repository was developed as part of the **Full Stack Development Internship (Project 2: Backend API Development)**.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [Required Packages](#required-packages)
4. [Installation & Setup](#installation--setup)
5. [How to Run the Server](#how-to-run-the-server)
6. [API Architecture & File Explanations](#api-architecture--file-explanations)
7. [API Endpoint Documentation](#api-endpoint-documentation)
8. [Testing Instructions (Postman & Curl)](#testing-instructions-postman--curl)

---

## Project Overview
The objective of this project is to showcase core backend engineering principles using Node.js and Express.js, including:
- **RESTful API Design**: Logical URI paths and standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
- **Input Validation**: Intercepting invalid user requests using middleware before processing.
- **Asynchronous Operations**: Handling file reads and writes using async/await to mock database transactions.
- **Standardized Responses**: Returning uniform JSON models for both success and error responses.
- **Proper HTTP Status Codes**: Explicit use of `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, and `500 Internal Server Error`.

---

## Folder Structure
The project follows a clean, modular Model-View-Controller (MVC) directory structure to separate concerns:

```text
Backend-API/
├── data/
│   └── users.json         # Mock database file (JSON format)
├── models/
│   └── userModel.js       # Data access layer (File I/O logic)
├── middleware/
│   └── validation.js      # Custom validation middleware
├── controllers/
│   └── userController.js  # Business logic & request handling
├── routes/
│   └── userRoutes.js      # API endpoint routing
├── server.js              # Express app initialization & server entry point
├── package.json           # Project manifest and scripts
└── README.md              # Project documentation (this file)
```

---

## Required Packages
- **Dependencies**:
  - `express`: The core web framework for routing, requests, and responses.
- **DevDependencies**:
  - `nodemon`: A utility that monitors changes in source files and automatically restarts the server, making development faster.

---

## Installation & Setup

1. **Prerequisites**: Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).
2. **Navigate to the Project Directory**:
   ```bash
   cd Backend-API
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```

---

## How to Run the Server

- **Development Mode** (Runs using `nodemon` for hot-reloading):
  ```bash
  npm run dev
  ```
- **Production Mode** (Runs using standard Node.js):
  ```bash
  npm start
  ```

Once started, the console will display:
```text
Server is running on: http://localhost:5000
```

---

## API Architecture & File Explanations

Here is a breakdown of how the files work together:

1. **`server.js`**: Instantiates Express, configures standard payload parsers (`express.json()` and `express.urlencoded()`), registers user routes under the `/users` prefix, and sets up a global 404 router and 500 error-handling middleware.
2. **`routes/userRoutes.js`**: Exposes specific endpoints. For methods requiring input (`POST` and `PUT`), it applies validation middleware functions *before* executing the controller.
3. **`middleware/validation.js`**: Inspects `req.body`. If requirements are violated (e.g. invalid email format, missing fields, or negative age), it immediately terminates the request with a `400 Bad Request` status and sends a JSON error. Otherwise, it calls `next()` to hand off control.
4. **`controllers/userController.js`**: Contains request handler functions. It extracts routing data/parameters, calls model operations, and sends responses formatted in JSON with the appropriate HTTP status codes.
5. **`models/userModel.js`**: Simulates the database. It handles reading/writing to `data/users.json` using Node's asynchronous `fs/promises` module. It also auto-increments IDs when creating new users.
6. **`data/users.json`**: An array of user objects. This file is modified in real-time as users are created, updated, or deleted.

---

## API Endpoint Documentation

All success and error payloads are returned in a standard JSON format.

### Standard Response Templates

- **Success Response Structure**:
  ```json
  {
    "success": true,
    "message": "Action description message",
    "data": { ... } // Or [ ... ] for list queries
  }
  ```
- **Error Response Structure**:
  ```json
  {
    "success": false,
    "message": "Specific error description"
  }
  ```

---

### 1. Get All Users
- **URL**: `/users`
- **Method**: `GET`
- **Status Code**: `200 OK`
- **Description**: Returns a list of all registered users.
- **Example Response**:
  ```json
  {
    "success": true,
    "message": "Users retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "age": 22
      }
    ]
  }
  ```

---

### 2. Get User By ID
- **URL**: `/users/:id`
- **Method**: `GET`
- **Status Code**: `200 OK` (Success) or `404 Not Found` (If ID does not exist)
- **Description**: Retrieves a single user matching the path parameter `:id`.
- **Example Response (Success)**:
  ```json
  {
    "success": true,
    "message": "User retrieved successfully",
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 22
    }
  }
  ```
- **Example Response (Error)**:
  ```json
  {
    "success": false,
    "message": "User with ID 999 not found"
  }
  ```

---

### 3. Create New User
- **URL**: `/users`
- **Method**: `POST`
- **Status Code**: `201 Created` (Success) or `400 Bad Request` (Validation Failure)
- **Request Headers**: `Content-Type: application/json`
- **Request Body Parameters**:
  - `name` (String, required)
  - `email` (String, required, must be valid format)
  - `age` (Number, required, must be positive integer)
- **Example Request Body**:
  ```json
  {
    "name": "Alice Cooper",
    "email": "alice@example.com",
    "age": 29
  }
  ```
- **Example Response (Success)**:
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "id": 3,
      "name": "Alice Cooper",
      "email": "alice@example.com",
      "age": 29
    }
  }
  ```
- **Example Response (Error - Missing Email)**:
  ```json
  {
    "success": false,
    "message": "Email is required"
  }
  ```
- **Example Response (Error - Invalid Age)**:
  ```json
  {
    "success": false,
    "message": "Age must be a positive number"
  }
  ```

---

### 4. Update Existing User
- **URL**: `/users/:id`
- **Method**: `PUT`
- **Status Code**: `200 OK` (Success), `400 Bad Request` (Validation Failure), or `404 Not Found` (If ID does not exist)
- **Request Headers**: `Content-Type: application/json`
- **Request Body Parameters** (Provide at least one):
  - `name` (String, optional)
  - `email` (String, optional, must be valid format)
  - `age` (Number, optional, must be positive integer)
- **Example Request Body**:
  ```json
  {
    "name": "Alice Cooper Updated",
    "age": 30
  }
  ```
- **Example Response (Success)**:
  ```json
  {
    "success": true,
    "message": "User updated successfully",
    "data": {
      "id": 3,
      "name": "Alice Cooper Updated",
      "email": "alice@example.com",
      "age": 30
    }
  }
  ```

---

### 5. Delete User
- **URL**: `/users/:id`
- **Method**: `DELETE`
- **Status Code**: `200 OK` (Success) or `404 Not Found` (If ID does not exist)
- **Description**: Deletes the user matching the path parameter `:id`.
- **Example Response (Success)**:
  ```json
  {
    "success": true,
    "message": "User deleted successfully"
  }
  ```

---

## Testing Instructions (Postman & Curl)

### 1. Testing via Postman
1. Open **Postman**.
2. Create a new collection named `Backend API Internship`.
3. Create individual requests with corresponding URLs (`http://localhost:5000/users` or `http://localhost:5000/users/1`).
4. Set the appropriate HTTP method (`GET`, `POST`, `PUT`, `DELETE`).
5. For `POST` and `PUT` requests:
   - Navigate to the **Body** tab.
   - Select **raw** and choose **JSON** from the dropdown menu.
   - Enter your JSON object.
6. Click **Send** and examine the response payload and HTTP status code.

### 2. Testing via Curl (Command Line)

- **Get All Users**:
  ```bash
  curl -X GET http://localhost:5000/users
  ```

- **Get Single User**:
  ```bash
  curl -X GET http://localhost:5000/users/1
  ```

- **Create User (Success)**:
  ```bash
  curl -X POST http://localhost:5000/users \
       -H "Content-Type: application/json" \
       -d '{"name": "Alice Cooper", "email": "alice@example.com", "age": 29}'
  ```

- **Create User (Validation Error - Negative Age)**:
  ```bash
  curl -X POST http://localhost:5000/users \
       -H "Content-Type: application/json" \
       -d '{"name": "Alice Cooper", "email": "alice@example.com", "age": -5}'
  ```

- **Update User**:
  ```bash
  curl -X PUT http://localhost:5000/users/1 \
       -H "Content-Type: application/json" \
       -d '{"name": "John Doe Updated", "age": 23}'
  ```

- **Delete User**:
  ```bash
  curl -X DELETE http://localhost:5000/users/1
  ```
