# NextGen Website Backend

This is the backend for the NextGen Website project, which serves as a centralized platform for community members to submit project ideas, vote on proposals, and manage ongoing work.

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Migrations](#migrations)
- [Contributing](#contributing)

## Technologies

- Node.js
- TypeScript
- Express.js
- MySQL or PostgreSQL
- OpenID Connect for authentication

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nextgen-website/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the server:
   ```
   npm run start
   ```

## Environment Variables

Create a `.env` file in the backend directory and add the following variables:

```
DB_HOST=<your_database_host>
DB_PORT=<your_database_port>
DB_USER=<your_database_user>
DB_PASS=<your_database_password>
DB_NAME=<your_database_name>
JWT_SECRET=<your_jwt_secret>
PORT=<your_preferred_port>
```

## API Endpoints

- **Authentication**
  - `POST /auth/login` - Log in a user
  - `POST /auth/register` - Register a new user

- **Ideas**
  - `POST /ideas` - Submit a new idea
  - `GET /ideas` - Retrieve all ideas
  - `POST /ideas/:id/vote` - Vote for an idea

- **Tasks**
  - `GET /tasks` - Retrieve tasks
  - `POST /tasks` - Create a new task
  - `PUT /tasks/:id` - Update a task
  - `DELETE /tasks/:id` - Delete a task

- **Dashboard**
  - `GET /dashboard` - Retrieve dashboard data

## Testing

Run tests using the following command:

```
npm test
```

## Migrations

Migrations are located in the `migrations` directory. Use the SQL files to set up your database schema.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.