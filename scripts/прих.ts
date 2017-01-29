import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";
import {executeSql} from "../sql/MsSqlDb";
import {ClientsDb, soft2002Db} from "../config/config";
import {stringAsSql} from "../sql/SqlCore";
import {sqlResultsToMd} from "../utils/sqlResultsToMd";


export class Прих_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
       // console.log("Банк_script, запорос от",userName);

        if (userName !== "savchenkov" && userName !== "sidorenko")
            return getInstantPromise<string>("");

        let words = this.splitMessage(message);

        let p1=words[1];
        let p2=words[2];
        let p3=words.slice(3).join(" ");

        //console.log(words);
        if (this.isEquals(words[0], ["прих","приход"])) {

            let sql = `EXEC _bot_прих ${stringAsSql(p1)},${stringAsSql(p2)},${stringAsSql(p3)}`;

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
            "|прих(од) 45000 евл за февраль 2017|создание приходного ордера на 45000 руб от Вихорева|",
        ];

        return getInstantPromise<string[]>(help);
    }
}
