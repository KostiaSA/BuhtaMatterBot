import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";

let price=`
### Прайс лист компании БУХта на 2017 год

|Кол-во мобил / стац. раб.мест / площадь склада, м2 |базовая стоимость|  5 / 1 / до 2000 м2|  8 / 2 / 2000-5000 м2|  15 / 3 / 5000-8000 м2| 20 / 4 / 8000-15000 м2|
|:--------------------------------------------------|----------------:|-------------------:|---------------------:|----------------------:|----------------------:|
|**Обследование**
|Обследование склада, формирование технических требований к системе   |             100 000|                100 000|               130 000|      150 000|200 000|
|**Функциональные модули**					
|Модуль "Обмен данными с управленческой системой"	                  |80 000|80 000|80 000	|80 000	|80 000|
|Модуль "Заработная плата"                                            |80 000|80 000|80 000|	80 000|	80 000|
|Модуль "Клиентский WEB-интерфейс"|	180 000|	180 000|	180 000|	180 000|	180 000|
|Модуль "Кумулятивная сборка"|	108 000|	108 000|	108 000	|108 000|	108 000|
|Модуль "3PL-оператор"	|150 000|	150 000|	150 000|	150 000|	150 000|
|Модуль "Приём под отгрузку"|	80 000	|80 000|	80 000|	80 000|	80 000|
|Модуль "Транспорт-Доставка"|	130 000	|130 000|	130 000|	130 000	|130 000|
|Модуль "Управление двором"	|108 000|	108 000|	108 000|	108 000|	108 000|
|Модуль "Рабочее место руководителя" (до 3-х моб. устройств)|	100 000	|100 000	|100 000	|100 000	|100 000
|**Внедрение** 					
|Услуги по настройке и внедрению системы	|150 000|	150 000|	200 000|	250 000	|300 000|
|Услуги по настройке оборудования	|60 000|	60 000|	90 000|	120 000|	150 000|
|**Итого за услуги по настройке:**	|**210 000**|	**210 000**|	**290 000**|	**370 000**|	**450 000**|
|**Обучение**
|Обучение пользователей: группа "Кладовщик" (до 10 человек в группе)	|28 800	|28 800	|28 800	|28 800	|28 800|
|Обучение пользователей: группа "Оператор" (до 5 человек в группе)	|8 100	|8 100|	8 100|	8 100|	8 100|
|Обучение пользователей: группа "Руководитель" (до 5 человек в группе)	|21 000|	21 000|	21 000|	21 000|	21 000|
|**Пользовательские лицензии**					
|Лицензия серверная на 1 (один) склад	|540 000	|540 000	|540 000	|540 000	|540 000
|Лицензия на мобильные рабочие места (ТСД)|	35 280	|176 400|	282 240|	529 200|	705 600
|Лицензия на стационарные рабочие места (ПК)|	23 880|	23 880|	47 760|	71 640|	95 520|
|**Типовая стоимость **					
|"Дистрибуционный склад" в рублях	||**1 188 180**|	**1 427 900**|	**1 798 740**|	**2 129 020**|

`


export class Прайс_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = this.splitMessage(message);
        if (this.isEqual(words[0], "прайс"))
            return getInstantPromise<string>(price);
        else
            return getInstantPromise<string>("");
    }

    async getHelp(userName: string): Promise<string[]> {
        let help = ["|прайс|актуальный прайс ООО БУХта|"];

        return getInstantPromise<string[]>(help);
    }
}
