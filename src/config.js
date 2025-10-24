import dotenv from "dotenv";
dotenv.config();

export const config = {
    dbUrl: process.env.DATABASE_URL,
    csvPath: process.env.CSV_PATH,
    port: process.env.PORT || 5000,
};