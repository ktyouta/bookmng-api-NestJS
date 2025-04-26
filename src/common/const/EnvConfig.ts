import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
    databaseUrl: process.env.DATABASE_URL,
    jwtKey: process.env.BOOKMNG_JWT_KEY,
};