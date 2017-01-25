import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";
import {executeSql} from "../sql/MsSqlDb";
import {ClientsDb, soft2002Db} from "../config/config";
import {stringAsSql} from "../sql/SqlCore";
import {sqlResultsToMd} from "../utils/sqlResultsToMd";


export class Дог_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = this.splitMessage(message);
        //console.log(words);
        if (this.isEquals(words[0], ["дог","договора"])) {

            return executeSql(soft2002Db, `EXEC _bot_договора ${stringAsSql(words[1])}`)
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
        let help = [
            "|дог(овора)|список последних договоров с клиентами|",
            "|дог(овора) роскар|список последних договоров с клиентом|",
        ];

        return getInstantPromise<string[]>(help);
    }
}
