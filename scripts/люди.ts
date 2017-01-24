import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";

let text = `
### Сотрудники БУХты

|сотрудник|местный|мобильный|
|:--|:--:|:--:|
|Савченков Константин| 6243| (921) 967-57-95|
|Сидоренко Игорь| 6247| (921) 967-57-94|
|Ненашева Лариса| 6251| (921) 999-33-95|
|Аверин Виктор| 6255| (911) 163-50-47|
|Бекенева Ирина| 6245| (950) 034-73-17|
|Воскресенская Екатерина| 4246| (921) 388-54-34|
|Егоров Андрей| 6255| (921) 310-06-95|
|Кутьин Владимир| 6248| (921) 967-39-89|
|Лукьяненко Анастасия| 6242| (911) 188-88-96|
|Лунин Дмитрий| 6248| (911) 991-48-32|
|Манюкова Татьяна| | (921) 300-97-95|
|Миносян Натэлла|  6255| (911) 215-97-92|
|Павлова Наталья| 6241| (921) 445-48-60|
|Поспелова Наталья| 6245| (931) 216-64-56|
|Свиньин Борис| 6255| (921) 780-19-40|
|Ткачуч Юрий||  (921) 777-69 -78|
|Федотова Светлана| 6474| (921) 944-37-52|
|Шперлинг Антон| 6255| (921) 747-97-22|
`


export class Люди_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = this.splitMessage(message);
        if (this.isEquals(words[0], ["люди","тел","телефоны","сотр","сотрудники",]))
            return getInstantPromise<string>(text);
        else
            return getInstantPromise<string>("");
    }

    async getHelp(userName: string): Promise<string[]> {
        let help = [
            "|люди|список сотрудников с телефонами|",
            "|(тел)ефоны|список сотрудников с телефонами|",
            "|(сотр)удники|список сотрудников с телефонами|",
        ];

        return getInstantPromise<string[]>(help);
    }
}
