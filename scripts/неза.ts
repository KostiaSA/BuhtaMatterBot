import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";
import {executeSql} from "../sql/MsSqlDb";
import {ClientsDb, soft2002Db} from "../config/config";
import {stringAsSql} from "../sql/SqlCore";
import {sqlResultsToMd} from "../utils/sqlResultsToMd";


export class Неза_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = this.splitMessage(message);
        //console.log(words);
        if (this.isEquals(words[0], ["неза","незакрытые"]) && this.isEquals(words[1], ["скл","склад","бух","бухта"])) {

            return executeSql(soft2002Db, `EXEC _bot_незакрытые ${stringAsSql(words[1])}`)
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
            "|неза(крытые) скл(ад)|незакрытые договора по WMS|",
            "|неза(крытые) бух(та)|незакрытые договора кроме WMS|",
        ];

        return getInstantPromise<string[]>(help);
    }
}
