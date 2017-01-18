import {getInstantPromise} from "../utils/getInstantPromise";
import {BotScript} from "../BotScript";


export class Привет_script extends BotScript {

    async getReply(userName: string, message: string): Promise<string> {
        let words = this.splitMessage(message);
        if (this.isEqual(words[0], "привет"))
            return getInstantPromise<string>("Добрый день");
        else
            return getInstantPromise<string>("");
    }

    async getHelp(userName: string): Promise<string[]> {
        let help = ["|привет|проверка бота|"];

        return getInstantPromise<string[]>(help);
    }
}
