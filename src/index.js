import express from "express";
import uploadRoute from "./routes/upload.js";
import {config} from "./config.js";

const app = express();
app.use(express.json());
app.use("/api",uploadRoute);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});