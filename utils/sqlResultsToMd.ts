function processMultiLineValue(value: string) {
    if (!value)
        return "";
    value = value.toString();
    let lines = value.split("\n");
    if (lines.length > 1) {
        return "\n" + lines.map((line: string) => {
                return "    " + line;
            }).join("\n");
    }
    else
        return value;

}

export function sqlResultsToMd(results: any): string {
    let md: string[] = [];

    for (let recordsetIndex = 0; recordsetIndex < results.length; recordsetIndex++) {
        let recordset = results[recordsetIndex];
        let row0 = recordset[0];
        if (!row0)
            continue;
        let options = row0.bot;
        if (!options) {
            options = `{"mode": "flat"}`;


        }

        try {
            options = JSON.parse(options);
        }
        catch (err) {
            return "ОШИБКА: " + err + "\n" + options;
        }
        if (options.mode === "flat") {
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
        else if (options.mode === "card") {

            for (let rowIndex = 0; rowIndex < recordset.length; rowIndex++) {

                let row = recordset[rowIndex];
                // шапка
                let str0 = "***";
                if (options.title)
                    str0 = "###" + options.title;
                md.push(str0);

                let strX = "";
                for (var key in row) {
                    if (key === "bot")
                        continue;
                    let value = row[key];
                    //console.log(key, value, typeof  value);
                    if (value instanceof Array)
                        md.push("**" + key.split(":")[0] + ":** " + processMultiLineValue(value.join(" ")));
                    else
                        md.push("**" + key.split(":")[0] + ":** " + processMultiLineValue(value));
                }
                //strX += "|";
                md.push(strX);
            }

        }
        else {// table
            // шапка
            let str0 = "";
            let str1 = "";
            for (var key in recordset[0]) {
                if (key === "bot")
                    continue;
                str0 += "|" + key.split(":")[0];
                if (key.split(":")[1] === "N")
                    str1 += "|--:";
                else
                    str1 += "|:--";
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
                    else {
                        if (!value)
                            value = "";
                        strX += "|" + value.toString().replace(/\n/g, " ").replace(/\r/g, " ");
                    }
                }
                strX += "|";
                md.push(strX);
            }
            md.push("");

        }

        // console.log(row0[""]);
        // console.log(row0);
    }

    // console.log(md);
    return md.join("\n");

}