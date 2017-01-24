import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";
import {executeSql} from "../sql/MsSqlDb";
import {ClientsDb, soft2002Db} from "../config/config";
import {stringAsSql} from "../sql/SqlCore";
import {sqlResultsToMd} from "../utils/sqlResultsToMd";


export class Банк_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        if (userName !== "savchenkov" && userName !== "sidorenko")
            return getInstantPromise<string>("");

        let words = this.splitMessage(message);
        //console.log(words);
        if (this.isEquals(words[0], ["банк", "ба"])) {

            let param1 = "";
            let param2 = "";
            if (!words[1]) {
                param1 = 'dbo.[DateWithOutTime](getdate())';
                param2 = param1;
            }
            else if (this.isEquals(words[1], ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"])) {
                param1 = `dbo.[DateWithOutTime](dateadd(d,-${words[1]},getdate()))`;
                param2 = "dbo.[DateWithOutTime](getdate())";
            }

            let sql = `
declare @p1 datetime=${param1}; 
declare @p2 datetime=${param2}; 
EXEC [_bot_bank] '51/2',@p1, @p2;
EXEC [_bot_bank] '51/1',@p1, @p2;
`;

            return executeSql(soft2002Db, sql)
                .then((result: any) => {
                    console.log(result);
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
            return getInstantPromise<string>("");

        let help = [
            "|ба(нк)|выписка банка за сегодня|",
            "|ба(нк) 5|выписка банка за последние 5 дней (до 15)|"
        ];

        return getInstantPromise<string[]>(help);
    }
}
