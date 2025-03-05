import { config } from 'dotenv';

config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'nextgen_website',
};

const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your_jwt_secret',
  expiresIn: '1h',
};

export { dbConfig, jwtConfig };