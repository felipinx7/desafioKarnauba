import dotenv from 'dotenv';
dotenv.config();

export const env = {
    JWT_SECRET: process.env.JWT_SECRET as string,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
}