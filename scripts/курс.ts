import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";
import {executeSql} from "../sql/MsSqlDb";
import {ClientsDb} from "../config/config";
import {stringAsSql} from "../sql/SqlCore";
import {sqlResultsToMd} from "../utils/sqlResultsToMd";
import {httpGet} from "../utils/httpGet";
import {xmlToJson} from "../utils/xmlToJson";
import * as moment from "moment";
import {replaceAll} from "../utils/replaceAll";

export function getKursFromJson(json: any, charCode: string, dateStr:string): number {
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

function getDelta(v2:number,v1:number):string{
    if (v1===-1 || v2===-1)
        return "";

    let delta=v2-v1;

    let sign="";
    if (delta>0.000001)
        sign="+";
    else
    if (delta<-0.000001)
        sign="";

    let ret="  *("+sign+ delta.toFixed(2)+")*";
    return ret;

}

export class Курс_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = this.splitMessage(message);
        console.log(words);
        if (this.isEquals(words[0], ["ку", "курс"])) {

            try {
                let yestTitle="вчера";
                let todayTitle="сегодня";
                let tomorTitle="завтра";

                let currDate=new Date();

                let today=moment(new Date(currDate));


                let yest=moment(new Date(currDate)).add(-1,"days");
                let tomor=moment(new Date(currDate)).add(1,"days");

                if (yest.toDate().getDay()==1)
                    yest=moment(new Date(yest.toDate())).add(-2,"days");
                else
                if (yest.toDate().getDay()==0) {
                    yest = moment(new Date(yest.toDate())).add(-1, "days");
                }

                if (today.toDate().getDay()==1)
                    today=moment(new Date(today.toDate())).add(-2,"days");
                else
                if (today.toDate().getDay()==0)
                    today=moment(new Date(today.toDate())).add(-1,"days");

                if (tomor.toDate().getDay()==1)
                    tomor=moment(new Date(tomor.toDate())).add(-2,"days");
                else
                if (tomor.toDate().getDay()==0)
                    tomor=moment(new Date(tomor.toDate())).add(-1,"days");

                let tomorDateStr=tomor.format("DD.MM.YYYY");
                let todayDateStr=today.format("DD.MM.YYYY");
                let yestDateStr=yest.format("DD.MM.YYYY");

                //console.log(yestDateStr,todayDateStr,tomorDateStr);

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

                let tomorUsdDelta=tomorUsd-todayUsd;
                let tomorEurDelta=tomorEur-todayEur;

                let todayUsdDelta=todayUsd-yestUsd;
                let todayEurDelta=todayEur-yestEur;

                // let tomorUsdDelStr="("+tomorUsdDelta.toFixed(4)+")";
                // if (tomorUsd===-1 || todayUsd===-1)
                //     tomorUsdDelStr="";

                //console.log([yestUsd,yestEur]);
                //console.log([todayUsd,todayEur]);
                //console.log([tomorUsd,tomorEur]);

                let title=`### курсы валют ЦБ на ${todayDateStr}`;
                if (words[1])
                    title=replaceAll(words[1],"_"," ");

                let text=`
${title}

| валюта | ${yestTitle} | ${todayTitle} | ${tomorTitle} |
|:--:|:--:|:--:|:--:|
|USD|${yestUsd.toString().replace("-1","нет")}|${todayUsd.toString().replace("-1","нет")}${getDelta(todayUsd,yestUsd)}|${tomorUsd.toString().replace("-1","нет")}${getDelta(tomorUsd,todayUsd)}|
|EUR|${yestEur.toString().replace("-1","нет")}|${todayEur.toString().replace("-1","нет")}${getDelta(todayEur,yestEur)}|${tomorEur.toString().replace("-1","нет")}${getDelta(tomorEur,todayEur)}|
`

                return text;
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
