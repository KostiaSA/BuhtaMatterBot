
import {Привет_script} from "./привет";
import {BotScript} from "../BotScript";
import {getInstantPromise} from "../utils/getInstantPromise";
import {Help_script} from "./help";
import {Прайс_script} from "./прайс";

export let registeredBotScripts:BotScript[]=[
    new Help_script(),
    new Привет_script(),
    new Прайс_script(),
];

export async function bot(userName: string, message: string): Promise<string> {

    for (let i = 0; i < registeredBotScripts.length; i++) {
        let reply = await registeredBotScripts[i].getReply(userName, message);
        if (reply !== "")
            return getInstantPromise(reply)
    }
    return getInstantPromise("неизвестная команда, наберите ? для подсказки");

}


