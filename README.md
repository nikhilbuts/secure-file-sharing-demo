# Secure File Sharing Platform

This project is a secure file-sharing platform with features such as user authentication, file upload/download, access control, file versioning, audit trail, and additional security measures.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication using JWT (JSON Web Tokens) with password hashing and salting
- File upload and download with associated metadata (owner, upload date, description)
- Access control based on user roles (regular user vs. admin)
- File deletion (users can delete their files, admins can delete any file)
- Basic file versioning system
- Audit trail for important events (user logins, file uploads, file deletions)
- CSRF protection, proper error handling, and input validation
- IP rate limiter

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- csurf for CSRF protection
- Other relevant libraries

## Getting Started

### Prerequisites

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository: `git clone https://github.com/nikhilbuts/secure-file-sharing-demo.git`
2. Navigate to the project directory: `cd secure-file-sharing-demo`
3. Install dependencies: `npm install`

### Running the Application

1. Start MongoDB: `mongod` (ensure the MongoDB daemon is running)
2. Configure environment variables: Create a `.env` file based on `.env.example` and set the required values.
3. Start the application: `npm start`
4. Open your browser and go to `http://localhost:3000` to access the application.

## API Documentation

Refer to the [Postman Collection](./postman-collection.json) for sample API requests and responses.

## Sample API Requests

### User Authentication

#### Register a new user

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}' http://localhost:3000/api/auth/register


curl -X POST -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}' http://localhost:3000/api/auth/login


curl -X POST -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:3000/api/auth/logout


curl -X POST -H "Authorization: Bearer YOUR_ACCESS_TOKEN" -F "file=@/path/to/your/file.txt" -F "filename=file.txt" -F "description=File description" http://localhost:3000/api/file/upload

curl -X GET -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:3000/api/file/download/YOUR_FILE_ID

curl -X DELETE -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:3000/api/file/delete/YOUR_FILE_ID

```
