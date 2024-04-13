import { config } from 'dotenv';
config();
export const PORT = process.env.PORT;
export const DATABASE_URI = process.env.DATABASE_URL
export const MASTER_PASSWORD = process.env.MASTER_PASSWORD || '';
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || '';
