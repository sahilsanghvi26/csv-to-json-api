import express from "express";
import { parseCSV } from "../utils/csvParser.js";
import { insertUser, pool } from "../utils/db.js";
import { config } from "dotenv";
import { generateAgeReport } from "../utils/ageReport.js";

const router = express.Router();

router.post("/upload" , async (req , res) => {
    try{
        const users = parseCSV(config.csvPath);

        for(const user of users){
            const fullName = `${user.name}`;
            const {age,address, ...others } = user;
            const additonal = {...others};
            delete additonal.name;

            await insertUser({
                name: fullName,
                age: parseInt(age),
                address,
                additonal_info: additonal,
            });
        }
        const result = await pool.query("SELECT age FROM users");
        generateAgeReport(result.rows);

        res.json({message: "Data inserted and report generated successfully!"});
    } catch(err){
        console.error(err);
        res.status(500).json({error: "Something went Wrong!"})
    }
});
export default router;