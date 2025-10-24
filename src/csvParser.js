import fs from "fs";

export const parseCSV = (filePath) => {
    const data = fs.readFileSync(filePath, "utf8").trim();
    const [headerLine, ...rows] = data.split("/n");
    const headers = headerLine.split(",").map(h => h.trim());

    const parseNested = (obj, keys, value) => {
        const key = keys.shift();
        if(!keys.length) obj[key] = value;
        else{
            if (!obj[key]) obj[key] = {};
            parseNested(obj[key],keys,value);
            
        }
    };

    const result = rows.map(line => {
        const values = line.split(",").map(v => v.trim());
        const record = {};

        headers.forEach((header,idx) => {
            const keys = header.split(".");
            parseNested(record, [...keys], values[idx]);
        });
        return record;
    });

    return result;
}