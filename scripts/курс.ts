import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";
import {executeSql} from "../sql/MsSqlDb";
import {ClientsDb} from "../config/config";
import {stringAsSql} from "../sql/SqlCore";
import {sqlResultsToMd} from "../utils/sqlResultsToMd";
import {httpGet} from "../utils/httpGet";
import {xmlToJson} from "../utils/xmlToJson";

function getKursFromJson(json: any, charCode: string, dateStr:string): number {
    if (dateStr!==json.ValCurs["$"].Date)
        return -1;

    let val_item = json.ValCurs.Valute.find((item: any) => {
        //console.log(item);
        return item.CharCode[0] === charCode;
    });
    if (val_item)
        return Number.parseFloat(val_item.Value[0].replace(",", "."));
    else
        return -1;
}

export class Курс_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = this.splitMessage(message);
        console.log(words);
        if (this.isEquals(words[0], ["ку", "курс"])) {

            try {

                let tomorDateStr="28.01.2017";
                let todayDateStr="27.01.2017";
                let yestDateStr="26.01.2017";

                // let tomorDateStr="27.01.2017";
                // let todayDateStr="26.01.2017";
                // let yestDateStr="25.01.2017";

                let tomorBody = await httpGet(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=`+tomorDateStr);
                let todayBody = await httpGet(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=`+todayDateStr);
                let yestBody = await httpGet(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=`+yestDateStr);

                let tomorJson = await xmlToJson(tomorBody);
                let todayJson = await xmlToJson(todayBody);
                let yestJson = await xmlToJson(yestBody);

                let tomorUsd=getKursFromJson(tomorJson,"USD",tomorDateStr);
                let tomorEur=getKursFromJson(tomorJson,"EUR",tomorDateStr);

                let todayUsd=getKursFromJson(todayJson,"USD",todayDateStr);
                let todayEur=getKursFromJson(todayJson,"EUR",todayDateStr);

                let yestUsd=getKursFromJson(yestJson,"USD",yestDateStr);
                let yestEur=getKursFromJson(yestJson,"EUR",yestDateStr);

                console.log([tomorUsd,tomorEur]);
                console.log([todayUsd,todayEur]);
                console.log([yestUsd,yestEur]);

                return todayEur.toString();
                //return todayJson.ValCurs.Valute[0];
                //return todayJson.ValCurs.Valute[0].Date.toString();
                //return todayJson.ValCurs["$"].Date.toString();
            }
            catch (e) {
                console.error(e);
                return e;
            }

        }
        else
            return getInstantPromise<string>("");

    }

    async getHelp(userName: string): Promise<string[]> {
        let help = [
            "|ку(рс)|информация о курсах ЦБ по USD и EUR|",
        ];

        return getInstantPromise<string[]>(help);
    }
}
