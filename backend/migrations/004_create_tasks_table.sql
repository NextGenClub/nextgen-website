CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    isComplete BOOLEAN DEFAULT FALSE,
    assignedTo INT,
    projectId INT,
    FOREIGN KEY (assignedTo) REFERENCES users(id),
    FOREIGN KEY (projectId) REFERENCES projects(id)
);