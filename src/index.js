import express from "express";
import uploadRoute from "./routes/upload.js";
import {config} from "./config.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use("/api",uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${config.port}`);
});