import Client from "./client";
import WebSocketClient from "./websocket_client";
import {config} from "./config/config";
import {bot} from "./scripts/_registerAllScripts";

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

export const matterClient = new Client();
const webSocketClient = new WebSocketClient();

matterClient.setUrl("http://" + config.matterServerUrl);
matterClient.useHeaderToken();
matterClient.enableLogErrorsToConsole(true);
matterClient.setTeamId(config.team);

matterClient.login(
    config.botUserName,
    config.botPassword,
    null,
    (data: any) => {
        console.log(data.nickname + " подключился", "token", matterClient.token);


        webSocketClient.reconnectCallback = () => {
            webSocketClient.sendMessage("authentication_challenge", {token: matterClient.token}, (result: any) => {
                if (result.status === "OK") {
                    console.log("websocket connect Ok");
                    console.log(data.nickname + " готов к работе, ждем запросов");
                    //console.log(result);
                }
            });
        };

        webSocketClient.eventCallback = (msg: any) => {
            try {
                if (msg.event === "posted") {
                    let post = JSON.parse(msg.data.post);

                    if (msg.data.sender_name !== config.botUserName) {
                        console.log("запрос от " + msg.data.sender_name + ": " + post.message);

                        //console.log(matterClient);
                        bot(msg.data.sender_name, post.message)
                            .then((reply: string) => {


                                matterClient.createPost({
                                        channel_id: post.channel_id,
                                        message: reply,
                                        props://JSON.stringify(`
                                            {
                                                "attachments": [
                                                    {
                                                        "fallback": "test777",
                                                        "color": "#FF8000",
                                                        "pretext": "This is optional pretext that shows above the attachment.",
                                                        "text": price,
                                                        "author_name": "Mattermost",
                                                        "author_icon": "http://www.mattermost.org/wp-content/uploads/2016/04/icon_WS.png",
                                                        "author_link": "http://www.mattermost.org/",
                                                        "title": "Example Attachment",
                                                        "title_link": "http://docs.mattermost.com/developer/message-attachments.html",
                                                        "fields": [
                                                            {
                                                                "short": false,
                                                                "title": "Long Field",
                                                                "value": "Testing with a very **long** piece of text that will take up the whole width of the table. And then some more text to make it extra long. Testing with a very **long** piece of text that will take up the whole width of the table. And then some more text to make it extra long. Testing with a very **long** piece of text that will take up the whole width of the table. And then some more text to make it extra long."
                                                            },
                                                            {
                                                                "short": true,
                                                                "title": "Column One",
                                                                "value": "Testing"
                                                            },
                                                            {
                                                                "short": true,
                                                                "title": "Column Two",
                                                                "value": "Testing"
                                                            },
                                                            {
                                                                "short": true,
                                                                "title": "Column 3",
                                                                "value": "Testing"
                                                            },
                                                            {
                                                                "short": true,
                                                                "title": "Column 4",
                                                                "value": "Testing"
                                                            },
                                                            {
                                                                "short": false,
                                                                "title": "Another Field",
                                                                "value": "Testing with a very **long** piece of te up the whole width of the table. And then some more text to make it extra long.g"
                                                            }
                                                        ],
                                                        //"image_url": "http://www.mattermost.org/wp-content/uploads/2016/03/logoHorizontal_WS.png"
                                                    }
                                                ]
                                            }
//`)

                                    },
                                    (success: any) => {
                                        //console.log("success ", success);
                                    }, (error: any) => {
                                        console.error("error ", error);
                                    });

                            })
                            .catch((err: string) => {

                                matterClient.createPost({
                                        channel_id: post.channel_id,
                                        message: err

                                    },
                                    (success: any) => {
                                        //console.log("success ", success);
                                    }, (error: any) => {
                                        console.error("error ", error);
                                    });

                            });


                    }

                }
            }
            catch (e) {
                console.error(e);
            }

        };

        webSocketClient.initialize("ws://" + config.matterServerUrl + "/api/v3/users/websocket");

    },
    function (err: any) {
        console.error(err.message);
    }
);

//console.log("buhta matter bot started");
