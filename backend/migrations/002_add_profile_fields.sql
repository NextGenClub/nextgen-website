-- Migration to add profile fields to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS name VARCHAR(100),
ADD COLUMN IF NOT EXISTS role VARCHAR(50),
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS position VARCHAR(100),
ADD COLUMN IF NOT EXISTS avatar VARCHAR(255),
ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS show_in_team BOOLEAN DEFAULT FALSE;

-- Update existing users to have default values
UPDATE users
SET name = username,
    role = 'User',
    show_in_team = FALSE
WHERE name IS NULL; 