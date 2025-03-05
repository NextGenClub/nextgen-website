# NextGen Website

## Overview
The NextGen Website project is designed to create a centralized platform for community members to submit project ideas, vote on proposals, and manage ongoing work. This document outlines the structure and setup of the project.

## Project Structure
The project is divided into two main parts: **frontend** and **backend**.

### Frontend
The frontend is built using React and TypeScript. It includes components for user authentication, idea submission, voting, task management, and a dashboard.

- **Public**: Contains static files like `favicon.ico` and `index.html`.
- **Src**: Contains the main application code, including components, pages, services, and context management.
- **Components**: Organized into subdirectories for different functionalities (Auth, Dashboard, Ideas, Layout, Tasks).
- **Pages**: Contains page components for routing.
- **Services**: Contains API service files for handling requests.
- **Types**: Contains TypeScript type definitions.

### Backend
The backend is built using Node.js and handles API requests, authentication, and database interactions.

- **Src**: Contains the main application code, including controllers, middleware, models, routes, services, and utilities.
- **Migrations**: Contains SQL files for setting up the database schema.
- **Tests**: Contains unit and integration tests for the backend functionality.

## Setup Instructions

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Run the application:
   ```
   npm start
   ```

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Run the application:
   ```
   npm run start
   ```

## Environment Variables
Both the frontend and backend require specific environment variables. Refer to the `.env.example` files in each directory for the required variables.

## Testing
- Frontend: Write component tests or integration tests as needed.
- Backend: Implement unit tests for critical functions and integration tests for API endpoints.

## Contribution Guidelines
- Follow the Git branching strategy outlined in the project documentation.
- Ensure all tests pass before merging changes.
- Maintain clear commit messages and pull request titles.

## License
This project is licensed under the MIT License. See the LICENSE file for details.