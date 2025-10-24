import express from "express";
import { parseCSV } from "../utils/csvParser.js";
import { insertUser, pool } from "../utils/db.js";
import { config } from "dotenv";
import { generateAgeReport } from "../utils/ageReport.js";

const router = express.Router();

//change
router.post("/upload" , async (req , res) => {
    try{
        const csvPath = process.env.CSV_PATH;
        console.log("Csv path:",csvPath);

        const users = parseCSV(csvPath);
        let insertedCount = 0;
    
        for(let i =0; i<users.length;i++){
            let user = users[i];
            if(!user.name || !user.age){
                console.log("Skipping the user due to invalid age")
            }
            const fullName = `${user.name}`;
            const {age,address, ...others } = user;
            const additional = {...others};
            delete additional.name;

            const ageNum = parseInt(age);
            if (isNaN(ageNum)) {
                console.warn("Skipping user due to invalid age number:", user.age);
                continue; // skip this row
            }

            await insertUser({
                name: fullName,
                age: parseInt(age),
                address:JSON.stringify(address || {}),
                additional_info: JSON.stringify(additional || {}),
            });
            insertedCount++;
        }
        console.log(`Inserted ${insertedCount} users successfully.`)
        const result = await pool.query("SELECT age FROM users");
        generateAgeReport(result.rows);

        res.json({message: "Data inserted and report generated successfully! Total inserted: ${insertedCount}"});
    } catch(err){
        console.error(err);
        res.status(500).json({error: "Something went Wrong!"})
    }
});
export default router;