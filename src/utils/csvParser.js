import fs from "fs";
//change
export const parseCSV = (filePath) => {
    const data = fs.readFileSync(filePath, "utf8").trim();
    const [headerLine, ...rows] = data.split("\n");
    const headers = headerLine.split(",").map(h => h.trim());

    const setNested = (obj,keys,value) => {
        const key = keys[0];
        if(keys.length === 1){
            obj[key] = value;
            return;
        }
        if(!obj[key]) obj[key] = {};
        setNested(obj[key],keys.slice(1),value);
    };
    return rows.map(line => {
        const values = line.split(",").map(v => v.trim());
        const record = {};
        headers.forEach((header,i)=> {
            setNested(record,header.split("."),values[i] ?? "");
        });
        return record;

    });

};