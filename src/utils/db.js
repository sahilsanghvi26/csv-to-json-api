import pkg from "pg";
import {config} from "../config.js";

const { Pool } = pkg;

export const pool = new Pool({
    connectionString: config.dbUrl,
});

export const insertUser = async (user) => {
    const {name , age ,address, additional_info} = user;
    await pool.query(
        `INSERT INTO users (name,age,address,additional_info)
        VALUES ($1, $2 ,$3, $4)`,
        [name,age,JSON.stringify(address || {}),JSON.stringify(additional_info || {})]
    );
};