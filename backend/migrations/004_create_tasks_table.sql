-- First, we need to ensure projects table exists
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    isComplete BOOLEAN DEFAULT FALSE,
    assignedTo INTEGER,
    projectId INTEGER,
    FOREIGN KEY (assignedTo) REFERENCES users(id),
    FOREIGN KEY (projectId) REFERENCES projects(id)
);