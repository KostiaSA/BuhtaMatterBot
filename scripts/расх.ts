import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";
import {executeSql} from "../sql/MsSqlDb";
import {ClientsDb, soft2002Db} from "../config/config";
import {stringAsSql} from "../sql/SqlCore";
import {sqlResultsToMd} from "../utils/sqlResultsToMd";


export class Расх_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
       // console.log("Банк_script, запорос от",userName);

        if (userName !== "savchenkov" && userName !== "sidorenko")
            return getInstantPromise<string>("");

        let words = this.splitMessage(message);

        let p1=words[1];
        let p2=words[2];
        let p3=words.slice(3).join(" ");

        //console.log(words);
        if (this.isEquals(words[0], ["расх","расход"])) {

            let sql = `EXEC _bot_расх ${stringAsSql(p1)},${stringAsSql(p2)},${stringAsSql(p3)}`;

            return executeSql(soft2002Db, sql)
                .then((result: any) => {
                    return sqlResultsToMd(result);
                })
                .catch((err: string) => {
                    return "ОШИБКА: " + err;
                });

            //return getInstantPromise<string>(text);
        }
        else
            return getInstantPromise<string>("");
    }

    async getHelp(userName: string): Promise<string[]> {
        if (userName !== "savchenkov" && userName !== "sidorenko")
            return getInstantPromise<string[]>([""]);

        let help = [
            "|расх(од) 5000 кут аванс за декабрь|создание расходного ордера 5000 руб на Кутьина|",
        ];

        return getInstantPromise<string[]>(help);
    }
}
