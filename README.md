# NextGen Website

## Overview

The NextGen Website project is designed to create a centralized platform for community members to submit project ideas, vote on proposals, and manage ongoing work. This document outlines the structure and setup of the project.

## Project Structure

The project is divided into two main parts: **frontend** and **backend**.

### Frontend

The frontend is built using React and TypeScript. It includes components for user authentication, idea submission, voting, task management, and a dashboard.

-  **Public**: Contains static files like `favicon.ico` and `index.html`.
-  **Src**: Contains the main application code, including components, pages, services, and context management.
-  **Components**: Organized into subdirectories for different functionalities (Auth, Dashboard, Ideas, Layout, Tasks).
-  **Pages**: Contains page components for routing.
-  **Services**: Contains API service files for handling requests.
-  **Types**: Contains TypeScript type definitions.

### Backend

The backend is built using Node.js and handles API requests, authentication, and database interactions.

-  **Src**: Contains the main application code, including controllers, middleware, models, routes, services, and utilities.
-  **Migrations**: Contains SQL files for setting up the database schema.
-  **Tests**: Contains unit and integration tests for the backend functionality.

## Prerequisites

-  Node.js (v14 or higher)
-  npm (v6 or higher)
-  PostgreSQL (v12 or higher)
-  Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-organization/nextgen-website.git
cd nextgen-website
```

### 2. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   PORT=5000
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=nextgen
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:3000
   ```

4. Set up PostgreSQL database:

   ```bash
   # Connect to PostgreSQL
   psql -U postgres

   # Create a new database
   CREATE DATABASE nextgen;

   # Create a new user (if needed)
   CREATE USER your_username WITH PASSWORD 'your_password';

   # Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE nextgen TO your_username;

   # Connect to the new database
   \c nextgen

   # Grant schema privileges
   GRANT ALL ON SCHEMA public TO your_username;
   ```

5. Run database migrations:

   ```bash
   # Run all pending migrations
   npm run migrate

   # If you need to undo the last migration
   npm run migrate:undo

   # If you need to undo all migrations
   npm run migrate:undo:all
   ```

6. Populate the database with mock data:

   ```bash
   npm run seed
   ```

7. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:

   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

## Database Population

The project includes a seed script to populate the database with mock data. This includes:

-  Sample users
-  Project ideas
-  Tasks
-  Team members

To populate the database:

1. Ensure the backend server is not running
2. Run the seed script:
   ```bash
   cd backend
   npm run seed
   ```

The seed script will create:

-  5 sample users
-  10 project ideas
-  20 tasks
-  Team member profiles

## Available Scripts

### Backend

-  `npm run dev`: Start the development server
-  `npm run build`: Build the production version
-  `npm run start`: Start the production server
-  `npm run migrate`: Run database migrations
-  `npm run migrate:undo`: Undo the last migration
-  `npm run migrate:undo:all`: Undo all migrations
-  `npm run seed`: Populate the database with mock data
-  `npm run test`: Run tests

### Frontend

-  `npm start`: Start the development server
-  `npm run build`: Build the production version
-  `npm test`: Run tests
-  `npm run eject`: Eject from Create React App

## Environment Variables

Both the frontend and backend require specific environment variables. Refer to the `.env.example` files in each directory for the required variables.

## Testing

-  Frontend: Write component tests or integration tests as needed.
-  Backend: Implement unit tests for critical functions and integration tests for API endpoints.

## Contribution Guidelines

-  Follow the Git branching strategy outlined in the project documentation.
-  Ensure all tests pass before merging changes.
-  Maintain clear commit messages and pull request titles.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
