export const generateAgeReport = (users) => {
    const groups = { "<20" :0,"20-40":0,"40-60":0,">60":0};
    const total = users.length;

    users.forEach((u) => {
        const age = u.age;
        if(age<20) groups["<20"]++;
        if(age <= 40) groups["20-40"]++;
        if(age <= 60) groups["40-60"]++;
        else groups[">60"]++;
    });

    console.log("\n Age Distribution Report");
    console.log("---------------------");
    Object.entries(groups).forEach(([range,count]) => {
        const percent = ((count / total) * 100).toFixed(2);
        console.log(`${range.padEnd(10)} | ${percent}%`);
    });
    console.log("---------------------")
};