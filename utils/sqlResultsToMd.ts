export function sqlResultsToMd(results: any): string {
    let md: string[] = [];

    for (let recordsetIndex = 0; recordsetIndex < results.length; recordsetIndex++) {
        let recordset = results[recordsetIndex];
        let row0 = recordset[0];
        if (!row0)
            break;
        let options = row0.bot;
        if (!options) {
            for (let rowIndex = 0; rowIndex < recordset.length; rowIndex++) {
                //console.log("recordset[rowIndex]", recordset[rowIndex]);
                for (var key in recordset[rowIndex]) {
                    if (key === "bot")
                        continue;
                    let value = recordset[rowIndex][key];
                    if (value instanceof Array)
                        md.push(value.join("\n"));
                    else
                        md.push(value);
                }
            }
        }
        else {
            try {
                options = JSON.parse(options);
            }
            catch (err) {
                return "ОШИБКА: " + err + "\n" + options;
            }
            if (options.mode === "card") {

                for (let rowIndex = 0; rowIndex < recordset.length; rowIndex++) {
                    for (var key in recordset[rowIndex]) {
                        if (key === "bot")
                            continue;
                        let value = recordset[rowIndex][key];
                        if (value instanceof Array)
                            md.push(value.join("\n"));
                        else
                            md.push(value);
                    }
                }

            }
            else {// table
            }
        }
        // console.log(row0[""]);
        // console.log(row0);
    }

    // console.log(md);
    return md.join("*");

}