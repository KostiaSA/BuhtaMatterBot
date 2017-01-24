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
                //
                // for (let rowIndex = 0; rowIndex < recordset.length; rowIndex++) {
                //
                //     let row = recordset[rowIndex];
                //     // шапка
                //     let str0 = "";
                //     let str1 = "";
                //     for (var key in row) {
                //         if (key === "bot")
                //             continue;
                //         str0 += "|" + key;
                //         str1 += "|:--:" + key;
                //     }
                //     str0 += "|";
                //     str1 += "|";
                //     md.push(str0);
                //     md.push(str1);
                //
                //     let strX = "";
                //     for (var key in row) {
                //         if (key === "bot")
                //             continue;
                //         let value = row[key];
                //         if (value instanceof Array)
                //             md.push("|"+value.join("\n"));
                //         else
                //             md.push("|"+value);
                //     }
                //     strX += "|";
                //     md.push(strX);
                // }
                //
            }
            else {// table
                // шапка
                let str0 = "";
                let str1 = "";
                for (var key in recordset[0]) {
                    if (key === "bot")
                        continue;
                    str0 += "|" + key;
                    str1 += "|:--:";
                }
                str0 += "|";
                str1 += "|";
                md.push(str0);
                md.push(str1);

                for (let rowIndex = 0; rowIndex < recordset.length; rowIndex++) {

                    let row = recordset[rowIndex];

                    let strX = "";
                    for (var key in row) {
                        if (key === "bot")
                            continue;
                        let value = row[key];
                        if (value instanceof Array)
                            strX += "|" + value.join(" ");
                        else
                            strX += "|" + value.toString().replace(/\n/g," ").replace(/\r/g," ");
                    }
                    strX += "|";
                    md.push(strX);
                }
            }
        }
        // console.log(row0[""]);
        // console.log(row0);
    }

    // console.log(md);
    return md.join("\n");

}