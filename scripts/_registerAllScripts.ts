
import {Привет_script} from "./привет";
import {BotScript} from "../BotScript";
import {getInstantPromise} from "../utils/getInstantPromise";
import {Help_script} from "./help";
import {Прайс_script} from "./прайс";
import {Люди_script} from "./люди";
import {Заявка_script} from "./заявка";
import {Кп_script} from "./кп";
import {Банк_script} from "./банк";
import {Сопр_script} from "./сопр";
import {Неза_script} from "./неза";
import {Дог_script} from "./дог";

export let registeredBotScripts:BotScript[]=[
    new Help_script(),
    new Привет_script(),
    new Прайс_script(),
    new Люди_script(),
    new Заявка_script(),
    new Кп_script(),
    new Банк_script(),
    new Сопр_script(),
    new Неза_script(),
    new Дог_script()
];

export async function bot(userName: string, message: string): Promise<string> {

    for (let i = 0; i < registeredBotScripts.length; i++) {
        let reply = await registeredBotScripts[i].getReply(userName, message);
        if (reply !== "")
            return getInstantPromise(reply)
    }
    return getInstantPromise("неизвестная команда, наберите ? для подсказки");

}


