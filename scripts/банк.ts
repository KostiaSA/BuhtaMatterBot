import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";
import {executeSql} from "../sql/MsSqlDb";
import {ClientsDb, soft2002Db} from "../config/config";
import {stringAsSql} from "../sql/SqlCore";
import {sqlResultsToMd} from "../utils/sqlResultsToMd";


export class Банк_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = this.splitMessage(message);
        //console.log(words);
        if (this.isEquals(words[0], ["банк","ба"])) {

            let param1="";
            let param2="";
            if (!words[1]){
                param1='dbo.[DateWithOutTime](getdate())';
                param2=param1;
            }

            let sql=`
declare @p1 date=${param1}; 
declare @p2 date=${param2}; 
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
        let help = [
            "|ба(нк)|выписка банка за сегодня|",
            "|ба(нк) нед(еля)|выписка банка за неделю|",
            "|ба(нк) мес(яц)|выписка банка за месяц|",
        ];

        return getInstantPromise<string[]>(help);
    }
}
