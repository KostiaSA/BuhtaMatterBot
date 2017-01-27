import * as moment from "moment";
import {httpGet} from "../utils/httpGet";
import {xmlToJson} from "../utils/xmlToJson";
import {getKursFromJson} from "../scripts/курс";
import {getValueFromSql, executeSql} from "../sql/MsSqlDb";
import {soft2002Db} from "../config/config";
import {dateAsSql} from "../sql/SqlCore";
import {matterPostMessage} from "../mattermost/matterPostMessage";
import {bot} from "../scripts/_registerAllScripts";

export function kursAgent() {
    setInterval(() => {
        checkKurs();
    }, 60000);
}

async function checkKurs() {


    let currDate = new Date();
    let today = moment(new Date(currDate));
    let tomor = moment(new Date(currDate)).add(1, "days");

    let buhtaKurs = await getValueFromSql(soft2002Db, `SELECT [Сумма рублей] FROM Курс WHERE Валюта=1 AND Группа='ЦБ' AND Дата=${dateAsSql(tomor.toDate())}`, "Сумма рублей") as number;

    if (!buhtaKurs) {

        let tomorDateStr = tomor.format("DD.MM.YYYY");

        //console.log(yestDateStr,todayDateStr,tomorDateStr);

        let tomorBody = await httpGet(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=` + tomorDateStr);

        let tomorJson = await xmlToJson(tomorBody);

        let tomorUsd = getKursFromJson(tomorJson, "USD", tomorDateStr);
        let tomorEur = getKursFromJson(tomorJson, "EUR", tomorDateStr);

        if (tomorUsd !== -1 && tomorEur !== -1) {
            let sql = `
INSERT Курс(Валюта,Группа,Дата,[Сумма валюты],[Сумма рублей],[Кто вводил],[Когда Вводил])
VALUES(1,'ЦБ',${dateAsSql(tomor.toDate())} ,1,${tomorUsd},'bot',getdate())
`;
            executeSql(soft2002Db, sql);

            let title = `###_новые_курсы_валют_ЦБ_на_завтра_${tomorDateStr}`;
            let message = await bot("agent", "курс " + title);

            matterPostMessage("kurs", message);

            console.log(tomorUsd);
        }
        else
            console.log("нет курсов");
    }

}