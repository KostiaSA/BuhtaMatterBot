import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";
import {executeSql} from "../sql/MsSqlDb";
import {ClientsDb} from "../config/config";
import {stringAsSql} from "../sql/SqlCore";
import {sqlResultsToMd} from "../utils/sqlResultsToMd";

let text = `
### Заявка

`


export class Заявка_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = this.splitMessage(message);
        //console.log(words);
        if (this.isEqual(words[0], "заявка") && words[1]) {

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
            "|заявка 23897|информация о заявке по номеру|",
            //   "|телефоны|список сотрудников с телефонами|",
            //   "|сотрудники|список сотрудников с телефонами|",
        ];

        return getInstantPromise<string[]>(help);
    }
}
