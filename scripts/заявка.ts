import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";
import {executeSql} from "../sql/MsSqlDb";
import {ClientsDb} from "../config/config";
import {stringAsSql} from "../sql/SqlCore";
import {sqlResultsToMd} from "../utils/sqlResultsToMd";


export class Заявка_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = this.splitMessage(message);
        //console.log(words);
        if (this.isEquals(words[0], ["заявка","за"]) && words[1]) {

            return executeSql(ClientsDb, `EXEC _bot_Информация_по_заявке ${ stringAsSql(words[1]) }`)
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
            "|за(явка) 21994|информация о заявке номер 29994|",
            "|за(явка) роскар|список заявок по роскар|",
            //   "|телефоны|список сотрудников с телефонами|",
            //   "|сотрудники|список сотрудников с телефонами|",
        ];

        return getInstantPromise<string[]>(help);
    }
}
