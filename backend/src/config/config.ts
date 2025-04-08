import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
  database: string;
  username: string;
  password: string;
  host: string;
  dialect: Dialect;
}

const config: Config = {
  database: process.env.DB_NAME || 'nextgen_website',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'Th1s1spostgres',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres'
};

export default config; 